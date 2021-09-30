import { UserSchema } from "../model/user.model";
import { IUser } from "../types/document/IUser";

export class MainUser {
    constructor() {}

    saveUser(user: IUser) {
        return new UserSchema(user).save()
    }

    deleteUser(_id: string) {
        return UserSchema.findByIdAndDelete(_id)
    }

    userLogin(_id: string) {
        return UserSchema.findById(_id)
    }

    updateUser(User: IUser) {
        return UserSchema.findByIdAndUpdate(User._id, User, {
            new: true
        })
    }
}