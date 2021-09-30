import { IMsgs, IUsers } from "../document/IGroup";

export interface SaveResGroup {
    _id: string;
    name: string;
    users: string[]
    messages: IMsgs[]
    createdAt?: string;
    updatedAt?: string;
}

export interface SaveMessageRes {
    groupId: string
    userId: string
    message: string
}
