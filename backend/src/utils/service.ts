import {Response} from "express";
import jwt from 'jsonwebtoken';
export class Service{
    static CreateErrorResponse(errorMsg:string,status:number){
        let err:Error=new Error(errorMsg);
        (err as any).errorStatus=status;
        throw err;
    }
    static CreateSuccessResponse(data:any,status:number,res:Response){
        res.status(status).json(data);
    }
    static GenerateJWTToken(res:Response,userID:string|number){
        const token=jwt.sign({userID:userID},process.env.JWT_SECRET as string,{expiresIn:"7d"});
        res.cookie("Token",token,{
            secure:process.env.NODE_ENV==='production',
            httpOnly:true,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return token;
    }
    static VerifyJWTToken(token:string){
        return jwt.verify(token,process.env.JWT_SECRET as string);
    }
}