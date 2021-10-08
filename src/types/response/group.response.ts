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

export interface CheckMsgResGroup {
    Group: string
    Result: Messages[]
}

interface Messages {
    User: string,
    Message: string
}

export interface GetUserMsgsRes {
    Group: string,
    Result: Messagess[]
}

interface Messagess {
    Group: string,
    Message: string
}

export interface checkUserMsgres {
    groupId: string
    messageBody: string
}