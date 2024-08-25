import { Router } from "express";
import { MessageController } from "../controller/messageController";

export class MessageRoutes{
    public router: Router = Router();

    constructor() {
        this.getRoutes();
    }

    getRoutes() {
        this.router.get('/', MessageController.welcome);
    }
}
export default new MessageRoutes().router;