import express from 'express';
import { GroupController } from '../controller/group.controller';
import { SaveReqGroup, DeleteReqGroup, AddUserReqGroup, CheckMsgReqGroup, SaveMessageReq, checkUserMsgReq } from "../types/request/group.request"
import { SaveMessageRes, SaveResGroup } from '../types/response/group.response';
import { tokenVerify } from '../middleware/auth.admin';
import CustomError from "../utils/error"

export class GroupRoutes {
    router: express.Router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/saveGroup', tokenVerify, async (req, res, next) => {
            try {
                const group: SaveReqGroup = req.body
                const newGroup: SaveResGroup = await new GroupController().saveGroup(group)
                res.status(200).json({
                    message: newGroup
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.delete('/deleteGroup', tokenVerify, async (req, res, next) => {
            try {
                const delreq: DeleteReqGroup = req.body
                const deletedGroup = await new GroupController().deleteGroup(delreq)
                res.status(200).json({
                    message: deletedGroup,
                    message2: "Group Deleted"
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/addUsers', tokenVerify, async (req, res, next) => {
            try {
                const user: AddUserReqGroup = req.body
                const addUser = await new GroupController().addUsers(user)
                res.status(200).json({
                    message: addUser,
                    message2: "User Added"
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/checkMsg', tokenVerify, async (req, res, next) => {
            try {
                const user: CheckMsgReqGroup = req.body
                const addUser = await new GroupController().checkMsg(user)
                res.status(200).json({
                    message: addUser,
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/userMsgs', async (req, res, next) => {
            try {
                const user: checkUserMsgReq = req.body
                const addUser = await new GroupController().userMessage(user)
                res.status(200).json({
                    message: addUser
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.post('/sendMessage', async (req, res, next) => {
            try {
                const msg: SaveMessageReq = req.body
                const newMsg: SaveMessageRes = await new GroupController().sendMessage(msg)
                res.status(200).json({
                    message: newMsg
                })
            } catch (error) {
                next(error)
            }
        })

    }
}
export const GroupRoutesApi = new GroupRoutes().router