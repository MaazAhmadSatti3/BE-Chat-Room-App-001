import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    pictureUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}