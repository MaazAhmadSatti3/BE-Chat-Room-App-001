import { IAdmin } from "../types/document/IAdmin";
import { MainAdmin } from "../repositories/admin.repositories";
import CustomError from "../utils/error"
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse } from "tsoa";
import { AdminReqLogin } from "../types/request/admin.request";
import jwt, { Secret } from "jsonwebtoken";
import { AdminResLogin } from "../types/response/admin.response";
require('dotenv').config();

@Route('admin')
@Tags('admin')

export class AdminController {
    constructor() {}

    @Post('saveAdmin')
    async saveAdmin(@Body() admin: AdminReqLogin): Promise<AdminResLogin> {
        const new_admin: IAdmin = await new MainAdmin().saveAdmin(<IAdmin>(admin))

        if(!new_admin)
            throw new CustomError(401, "Invalid Credentials")
        return <AdminResLogin> {
            token_key: jwt.sign(JSON.stringify(admin), <Secret>process.env.token_key),
            message: "Credentials Approved"
        }
    }
}