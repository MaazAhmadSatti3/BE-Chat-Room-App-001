import express from 'express'
import { AdminController } from '../controller/admin.controller'
import { IAdmin } from '../types/document/IAdmin'
import { AdminReqLogin } from '../types/request/admin.request'
import { AdminResLogin } from '../types/response/admin.response'
import CustomError from "../utils/error"

export class AdminRoutes {
    router: express.Router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    routes() {
        this.router.post('/saveAdmin',  async (req, res, next) => {
            try {
            const admin: AdminReqLogin = req.body
            const newAdmin: AdminResLogin = await new AdminController().saveAdmin(admin)
            res.status(200).json({
                token_key: newAdmin.token_key,
                message: newAdmin.message
              })
            } catch (error) {
                next(error)
            }  
        })
    }
}
export const AdminRoutesApi = new AdminRoutes().router