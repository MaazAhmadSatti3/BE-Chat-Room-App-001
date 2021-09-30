import { Schema, model } from "mongoose";
import { IUser } from "../types/document/IUser";

const IUserSchema = new Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        pictureUrl: { type: String },
    },
    { timestamps: true }
)
export const UserSchema = model<IUser>('IUserSchema', IUserSchema)