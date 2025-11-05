import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/app-config";

export const generateJWTToken = ( userId: string, purpose: string) => {
    const secret: Secret = config.JWT.SECRET as string;

    const token = jwt.sign(
        { userId , purpose },
        secret,
        {
            expiresIn: "1h", // ✅ نحولها لنص فقط
        } as SignOptions // 👈 نوضح إنها من نوع SignOptions علشان TS يسكت
    );

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return token;
};
