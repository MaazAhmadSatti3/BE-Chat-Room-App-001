import { IGroup } from "../types/document/IGroup";
import { MainGroup } from "../repositories/group.repositories";
import CustomError from '../utils/error'
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import { SaveReqGroup, DeleteReqGroup, AddUserReqGroup, CheckMsgReqGroup, SaveMessageReq } from '../types/request/group.request' 
import { SaveMessageRes, SaveResGroup } from "../types/response/group.response";
import { group } from "console";

@Route('group')
@Tags('group')

export class GroupController {
    constructor() {}

    @Security('api_key')
    @Post('/saveGroup')
    async saveGroup(@Body() group: SaveReqGroup): Promise<SaveResGroup> {
        const new_group: IGroup = await new MainGroup().saveGroup(<IGroup>(group))
        return <SaveResGroup> (new_group)
    }

    @Security('api_key')
    @Delete('/deleteGroup')
    @SuccessResponse("200","Group deleted")
    async deleteGroup(@Body() delreq: DeleteReqGroup): Promise<SaveResGroup> {
        return <SaveResGroup> await new MainGroup().deleteGroup(delreq.id)
    }

    @Security('api_key')
    @Post('/addUsers')
    async addUsers(@Body() group: AddUserReqGroup): Promise<SaveResGroup> {
        const new_user = await new MainGroup().addUsers(group)
        return <SaveResGroup> (new_user)
    }

    @Security('api_key')
    @Post('/checkMsg')
    async checkMsg(@Body() group: CheckMsgReqGroup): Promise<SaveResGroup> {
        const new_user = await new MainGroup().checkMsg(group)
        return <SaveResGroup> (new_user)
    }

    @Post('/sendMessage')
    async sendMessage(@Body() group: SaveMessageReq): Promise<SaveMessageRes> {
        const new_msg: SaveMessageReq = <any> await new MainGroup().sendMessage(group)
        return <SaveMessageRes> (new_msg)
    }

}