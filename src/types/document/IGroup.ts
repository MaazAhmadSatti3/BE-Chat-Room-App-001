import { Document } from "mongoose";

export interface IGroup extends Document {
    _id: string;
    name: string;
    users: string[]
    messages: IMsgs[];
    createdAt?: string;
    updatedAt?: string;
}   

export interface IUsers {
    userId: string 
}

export interface IMsgs {
    userId :string,
    msg: string 
}