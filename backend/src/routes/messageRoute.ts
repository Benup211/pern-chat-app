import { Router } from "express";
import { MessageController } from "../controller/messageController";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { MessageValidator } from "../validators/messageValidator";
export class MessageRoutes {
    public router: Router = Router();

    constructor() {
        this.getRoutes();
        this.postRoutes();
    }

    getRoutes() {
        this.router.get("/", MessageController.welcome);
        this.router.get(
            "/get/:id",
            MessageValidator.getMessage(),
            GlobalMiddleware.CheckValidation,
            GlobalMiddleware.CheckAuth,
            MessageController.getMessage
        );
        this.router.get(
            "/users",
            GlobalMiddleware.CheckAuth,
            MessageController.getUserForSideBar
        );
    }
    postRoutes() {
        this.router.post(
            "/send/:id",
            MessageValidator.sendMessage(),
            GlobalMiddleware.CheckValidation,
            GlobalMiddleware.CheckAuth,
            MessageController.sendMessage
        );
    }
}
export default new MessageRoutes().router;
