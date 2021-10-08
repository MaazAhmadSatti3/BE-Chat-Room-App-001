import { IGroup } from "../types/document/IGroup";
import { MainGroup } from "../repositories/group.repositories";
import CustomError from '../utils/error'
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import { SaveReqGroup, DeleteReqGroup, AddUserReqGroup, CheckMsgReqGroup, SaveMessageReq, checkUserMsgReq } from '../types/request/group.request' 
import { CheckMsgResGroup, GetUserMsgsRes, SaveMessageRes, SaveResGroup } from "../types/response/group.response";
import { userMessages } from '../modules/check.module'
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
    async checkMsg(@Body() group: CheckMsgReqGroup): Promise<CheckMsgResGroup[]> {
        const new_user:any = await new MainGroup().checkMsg()
        // console.log(new_user)

        let result: any[]=[]
        
        new_user.map((element: any) => {
            let groupResult: CheckMsgResGroup = {
                Group: element._id,
                Result: []
            }
            
            element.messages.map((message: any) => {
                
                if(message.msg.toLowerCase().includes(group.message.toLowerCase())) {
                    groupResult.Result.push({
                        User: message.userId,
                        Message: message.msg
                    })
                }
            })
            if (groupResult.Result.length > 0) {
                result.push(groupResult)
            }
        })
        return result
    }

    // @Post('/userMsgs')
    // async userMessage(@Body() userMessage: GetUserMsgsReq): Promise<GetUserMsgsRes[]> {
    //     const user_messages: any = await new MainGroup().userMessages()

    //     let result: any[] = []

    //     user_messages.map((element: any) => {
    //         let userMessageResult: GetUserMsgsRes = {
    //             Group: element._id,
    //             Result: []
    //         }

    //         for(let i=0; i<element.messages.length; i++) {
    //             // console.log(element.messages[i].userId.toString())

    //             if(element.messages[i].userId.toString() === userMessage.userId) {
    //                 userMessageResult.Result.push({
    //                     Group: element._id,
    //                     Message: element.messages[i].msg
    //                 })
    //             }
    //         }

    //         if(userMessageResult.Result.length > 0) {
    //             result.push(userMessageResult)
    //         }
    //     })

    //     let res : any[] = []
    //     for(let i=0; i<result.length; i++) {

    //         for(let j=0; j<result[i].Result.length; j++) {
        
    //             if(result[i].Result[j].Message === userMessage.message ) {
    //                 console.log(result[i].Result[j])
    //                 res.push({
    //                     user : userMessage.userId,
    //                     data : result[i].Result[j]
    //                 })
    //             }
    //         }
    //     }    
    //     return res
    // }

    @Post('/userMsgs')
    async userMessage(@Body() userMessage: checkUserMsgReq): Promise<any[]> {
    const user_messages: any = await new MainGroup().userMessages()
    const checkMessages = userMessages(userMessage.messageBody, userMessage.userId, user_messages)
    return checkMessages
    }


    @Post('/sendMessage')
    async sendMessage(@Body() group: SaveMessageReq): Promise<SaveMessageRes> {
        const new_msg: SaveMessageReq = <any> await new MainGroup().sendMessage(group)
        return <SaveMessageRes> (new_msg)
    }
}