import { NextFunction, Request, Response } from "express"
import User from "../models/user";
import { generateJWTToken } from "../utils/generateToken";
import Verification from "../models/verification";
import { config } from "../config/app-config";
import { sendEmail } from "../utils/send-email-send-grid";
import aj from "../utils/arcjet";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";



const registerUser = async (req: Request, res: Response) => {

    try {

        const { name, email, password } = req.body


        const decision = await aj.protect(req, { email } as any);
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests, try again later." });
            }

            if (decision.reason.isEmail()) {
                return res.status(400).json({ message: "Invalid or disposable email address." });
            }

            return res.status(403).json({ message: "Request blocked by Arcjet." });
        }


        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                message: "Email address already in use",
            })
        }
        const userCreated = await User.create({
            name,
            email,
            password,
        })

        const token = generateJWTToken(userCreated.id, "email-verification")

        await Verification.create({
            userId: userCreated.id,
            token,
            expiresAt: Date.now() + 1 * 60 * 60 * 1000,
        })

        const verificationLink = `${config.APP_ORIGIN}/verify-email?token=${token}`;
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
        const emailSubject = "Verify your email";
        const isEmailSent = await sendEmail(email, emailSubject, emailBody);

        if (!isEmailSent) {
            return res.status(500).json({
                message: "Failed to send verification email",
            });
        }

        res.status(201).json({
            message:
                "Verification email sent to your email. Please check and verify your account.",
            user: {
                ...userCreated.toObject(),
                password: undefined
            }
        });
    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            })
        }
        res.status(500).json({
            message: "Internal server error",
        })
    }

};


const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!user.isEmailVerified) {
            const existingVerification = await Verification.findOne({
                userId: user._id,
            });

            if (existingVerification && existingVerification.expiresAt > new Date) {
                return res.status(400).json({
                    message:
                        "Email not verified. Please check your email for the verification link.",
                });
            } else {
                await Verification.findByIdAndDelete(existingVerification?.id);
                const newToken = generateJWTToken(user.id, "email-verification");
                await Verification.create({
                    userId: user.id,
                    token: newToken,
                    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
                })

                const verificationLink = `${config.APP_ORIGIN}/verify-email?token=${newToken}`;
                const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
                const emailSubject = "Verify your email";
                const isEmailSent = await sendEmail(email, emailSubject, emailBody);

                if (!isEmailSent) {
                    return res.status(500).json({
                        message: "Failed to send verification email",
                    });
                }
                res.status(201).json({
                    message:
                        "Verification email sent to your email. Please check and verify your account.",
                });
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = generateJWTToken(user.id, "login");

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });



        user.lastLogin = new Date();
        await user.save();

        const { password: safePassword, ...safeUser } = user.toObject();


        res.status(200).json({
            message: "Login successful",
            user: safeUser,
        });


    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            })
        }
        res.status(500).json({
            message: "Internal server error",
        })
    }
}


const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        const payload = jwt.verify(token, config.JWT.SECRET);

        if (!payload) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { userId, purpose } = payload as JwtPayload & { userId?: string; purpose?: string };;
        if (purpose !== "email-verification") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }

        const verification = await Verification.findOne({
            userId,
            token,
        });

        if (!verification) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isExpired = verification.expiresAt.getTime() < Date.now();
        if (isExpired) {
            return res.status(401).json({ message: "Token expired" });
        }



        user.isEmailVerified = true;
        await user.save();

        await Verification.findByIdAndDelete(verification._id);

        res.status(200).json({
            message: "Email verified successfully",
        })
    } catch (err) {
        if (err instanceof Error) {
            console.log("error verifying email", err);
            res.status(400).json({ success: false, message: err.message });
        }
        res.status(500).json({ message: "Internal server error" });

    }
}




export { registerUser, loginUser , verifyEmail }