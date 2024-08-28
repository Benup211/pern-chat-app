import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import MessageRoutes from "./routes/messageRoute";
import AuthRoutes from "./routes/authRoute";
import cors from 'cors';
import { Request, Response,NextFunction } from "express";

export class MainServer {
    public app: express.Application = express();
    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.handle404Error();
        this.handleClientError();
    }
    async setConfiguration() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors({origin: "http://localhost:5173", credentials: true}));
        this.app.use(bodyParser.json());
    }

    setRoutes() {
        this.app.use("/api/message", MessageRoutes);
        this.app.use("/api/auth", AuthRoutes);
    }
    handle404Error() {
		this.app.use((req: Request, res: Response) => {
			res.status(404).json({
				status: 404,
				errorName: "Not Found",
				errorMessage: "Not Found",
			});
		});
	}
    handleClientError() {
        this.app.use((err: Error, req: Request, res: Response,next:NextFunction) => {
            let errorStatus = (err as any).errorStatus || 500;
			let errorMessage = err.message || "Something went wrong. Please try again later";
            res.status(errorStatus).json({
                status: errorStatus,
                errorName: err.name,
                errorMessage: errorMessage,
            });
        });
    }
}
