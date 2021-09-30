import { Schema, model } from "mongoose";
import { IGroup } from "../types/document/IGroup"; 

const IGroupSchema = new Schema(
    {
        name: { type: String },
        users: [{ type: Schema.Types.ObjectId, ref: 'IUserSchema' }],
        messages: [{
            userId: { type: Schema.Types.ObjectId, ref: 'IUserSchema' },
            msg: { type: String },
        }],
    },
    { timestamps: true }
)
export const GroupSchema = model<IGroup>('IGroupSchema', IGroupSchema)