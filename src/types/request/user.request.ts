export interface SaveReqUser {
    username: string;
    email: string;
    password: string;
    pictureUrl?: string;
}

export interface DeleteReqUser {
    id: string;
}

export interface UserReqLogin {
    userId: string
}

export interface UpdateReqUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    pictureUrl?: string;
}