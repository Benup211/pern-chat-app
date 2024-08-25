import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import MessageRoutes from "./routes/messageRoute";
import AuthRoutes from "./routes/authRoute";
export class Server {
    public app: express.Application = express();
    constructor() {
        this.setRoutes();
        this.setConfiguration();
    }
    async setConfiguration() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
    }

    setRoutes() {
        this.app.use("/api/message", MessageRoutes);
        this.app.use("/api/auth", AuthRoutes);
    }
}
