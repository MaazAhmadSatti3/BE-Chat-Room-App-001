import express from 'express';
import { UserController } from '../controller/user.controller';
import { IUser } from '../types/document/IUser';
import { SaveReqUser, DeleteReqUser, UserReqLogin, UpdateReqUser } from "../types/request/user.request"
import { SaveResUser } from '../types/response/user.response';
import { tokenVerify } from '../middleware/auth.admin';
import CustomError from "../utils/error"

export class UserRoutes {
    router: express.Router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/saveUser', tokenVerify, async (req, res, next) => {
            try {
                const user: SaveReqUser = req.body
                console.log(req.body)
                const newUser: SaveResUser = await new UserController().saveUser(user)
                return res.status(200).send({
                    message: newUser
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.delete('/deleteUser', tokenVerify, async (req, res, next) => {
            try {
                const reqdel : DeleteReqUser = req.body
                const userDeleted = await new UserController().deleteUser(reqdel)
               return res.status(200).send({
                    message: userDeleted,
                    message2: "User Deleted"
                })
            } catch (error) {
                next(error)
            }
        })        

        this.router.post('/userLogin', async (req, res, next) => {
            try {
                const logreq: UserReqLogin = req.body
                const userLogin = await new UserController().userLogin(logreq)
                return res.status(200).send({
                    message: userLogin,
                    message2: "User LogedIn"
                })
            } catch (error) {
                next(error)
            }
        })

        this.router.put('/updateUser', async (req, res, next) => {
            try {
                const reqUpdate: UpdateReqUser = req.body
                const userUpdated = await new UserController().updateUser(reqUpdate)
                return res.status(200).send({
                    message: userUpdated,
                    message2: "User Updated"
                })
            } catch (error) {
                next(error)
            }
        })
    }
}
export const UserRoutesApi = new UserRoutes().router