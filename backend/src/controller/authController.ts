import { Request, Response } from 'express';
export class AuthController{

    static async welcome(req:Request,res:Response){
        res.status(200).json({message:"Welcome to the API"});
    }
}