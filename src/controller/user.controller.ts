import { IUser } from "../types/document/IUser";
import { MainUser } from "../repositories/user.repositories";
import CustomError from '../utils/error'
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import { SaveReqUser, DeleteReqUser, UserReqLogin, UpdateReqUser } from "../types/request/user.request"
import { SaveResUser } from "../types/response/user.response";
import { SaveResGroup } from "../types/response/group.response";

@Route('user')
@Tags('user')

export class UserController {
    constructor() {}

    @Security('api_key')
    @Post('/saveUser')
    async saveUser(@Body() user: SaveReqUser): Promise<SaveResUser> {
        const new_user: IUser = await new MainUser().saveUser(<IUser>(user))
        return <SaveResUser> (new_user)
    }

    @Security('api_key')
    @Delete('/deleteUser')
    @SuccessResponse("200","User deleted")
    async deleteUser(@Body() delreq: DeleteReqUser): Promise<SaveResUser> {
        return <SaveResUser> await new MainUser().deleteUser(delreq.id)
    }

    @Post('/userLogin')
    @SuccessResponse("200","User login")
    async userLogin(@Body() req: UserReqLogin) {
        return await new MainUser().userLogin(req.userId)
    }

    @Put('/updateUser')
    async updateUser(@Body() user: UpdateReqUser): Promise<SaveResUser> {
        const update_user: IUser = await new MainUser().updateUser(<IUser>(user));
        if (update_user === null)
          throw new CustomError(400, 'User not updated');
        return <SaveResUser> update_user;
      }
}