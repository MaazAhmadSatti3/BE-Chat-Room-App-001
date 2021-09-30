import { IMsgs, IUsers } from "../document/IGroup";

export interface SaveReqGroup {
    name: string;
}

export interface DeleteReqGroup {
    id: string;
}

export interface AddUserReqGroup {
    groupId: string
    userId: string
}

export interface CheckMsgReqGroup {
    messages: IMsgs[]
}

export interface SaveMessageReq {
    groupId: string
    userId: string
    message: string
}