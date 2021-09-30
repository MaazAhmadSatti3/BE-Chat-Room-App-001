export interface IMessage extends Document {
    _id: string;
    msg: string;
    createdAt?: string;
    updatedAt?: string;
}