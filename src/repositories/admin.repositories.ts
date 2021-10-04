import { AdminSchema } from "../model/admin.model";
import { IAdmin } from "../types/document/IAdmin";

export class MainAdmin {
    constructor() {}

    authAdmin(admin: IAdmin) {
        return new AdminSchema(admin).save()
    }
}