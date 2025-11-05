import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String, required: true, select: false },
        name: { type: String, required: true, trim: true },
        profilePicture: { type: String },
        isEmailVerified: { type: Boolean, default: false },
        lastLogin: { type: Date },
        is2FAEnabled: { type: Boolean, default: false },
        twoFAOtp: { type: String, select: false },
        twoFAOtpExpires: { type: Date, select: false },
    },
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);

    }

})

const User = mongoose.model("User", userSchema)

export default User;