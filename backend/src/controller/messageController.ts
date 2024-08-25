import { Request,Response } from "express";

export class MessageController {
    
    static async welcome(req: Request, res: Response) {
        res.status(200).json({ message: "Welcome to the API" });
    }
}