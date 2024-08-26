import { body,param } from "express-validator";

export class MessageValidator{

    static sendMessage(){
        return [
            body("message").notEmpty().withMessage("Message is required"),
            param("id").notEmpty().withMessage("User ID is required")
        ];
    }
    static getMessage(){
        return[
            param("id").notEmpty().withMessage("User ID is required")
        ]
    }
}