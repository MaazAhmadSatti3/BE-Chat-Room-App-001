import { GroupSchema } from "../model/group.model";
import { UserSchema } from "../model/user.model";
import { AddUserReqGroup, CheckMsgReqGroup, SaveMessageReq } from "../types/request/group.request"
import { IGroup } from "../types/document/IGroup";
import { CheckMsgResGroup, SaveMessageRes } from "../types/response/group.response";

export class MainGroup {
    constructor() {}

    saveGroup(group: IGroup) {
        return new GroupSchema(group).save()
    }

    deleteGroup(_id: string) {
        return GroupSchema.findByIdAndDelete(_id)
    }

    async addUsers(group: AddUserReqGroup) {
        let groupDoc = await GroupSchema.findById(group.groupId);
        if(groupDoc) {
            groupDoc?.users.push(group.userId)
            return groupDoc.save()
        }
    }

    async checkMsg(id: CheckMsgReqGroup): Promise<any> {
        let groupDoc = await GroupSchema.findById(id.groupId)
        return <any> groupDoc
    }

    sendMessage(Message: SaveMessageReq){
        return GroupSchema.findByIdAndUpdate(
            Message.groupId,
            {
                '$push': {
                    'messages': { msg: Message.message, userId: Message.userId}
                }
            },
                {
                    new: true,
                    upsert: true

                }
        )
    }

}