import { Request, Response, NextFunction } from "express";
import { IAdmin } from "../types/document/IAdmin";
import jwt from 'jsonwebtoken'
import CustomError from '../utils/error'

const conf = process.env

export const tokenVerify = async function (req: Request, res: Response, next: NextFunction) {
    
 let token:any = req.header('token')
 const decoded = jwt.verify(token, <jwt.Secret>conf.TOKEN_KEY); 
            req.body = <IAdmin> decoded
            console.log(decoded,"wa")

 if (!token) {
        let err = new CustomError(403, "Admin token is required/login")
        next(err);
    } else {
        try {
            const decoded = jwt.verify(token, <jwt.Secret>conf.TOKEN_KEY); 
            req.body = <IAdmin> decoded
            console.log(decoded,"wa")
         } catch (err) {
            err = new CustomError(401, "Invalid token in header");
            next(err);
        }
    }
    next();
}