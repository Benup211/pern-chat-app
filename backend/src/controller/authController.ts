import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma";
import { Service } from "../utils/service";
import bcryptjs from "bcryptjs";
import { Avatar } from "../utils/avatar";
import { AuthRepository } from "../repository/authRepository";
export class AuthController {
    static async welcome(req: Request, res: Response) {
        res.status(200).json({ message: "Welcome to the API" });
    }

    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            let { username, fullName, password, gender } =
                req.body;
            const user = await AuthRepository.findUserByUsername(username);
            if (user) {
                next(Service.CreateErrorResponse("User already exists", 400));
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            const profilePic = Avatar(username, gender);
            const newUser = await AuthRepository.createUser(username,fullName,hashedPassword,gender,profilePic);
            if (newUser) {
                const token = Service.GenerateJWTToken(res, newUser.id);
                res.status(201).json({
                    user: {
                        id: newUser.id,
                        fullName: newUser.fullName,
                        username: newUser.username,
                        profilePic: newUser.profilePicture,
                    },
                    message:"User Registered Sucessfully"
                });
            } else {
                next(
                    Service.CreateErrorResponse("Error Creating New User", 400)
                );
            }
        } catch (err) {
            next(err);
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        try {
            const user = await AuthRepository.findUserByUsername(username);
            if (!user) {
                next(Service.CreateErrorResponse("Invalid Credentials", 404));
            }
            const passwordMatch = user
                ? await bcryptjs.compare(password, user.password)
                : false;
            if (!passwordMatch) {
                next(Service.CreateErrorResponse("Invalid Credentials", 404));
            }
            if(user){
                const token=Service.GenerateJWTToken(res,user.id);
                res.status(200).json({
                    user: {
                        id: user.id,
                        fullName: user.fullName,
                        username: user.username,
                        profilePicture: user.profilePicture,
                    },
                    message:"User Login Sucessfully"
                });
            }else{
                next(Service.CreateErrorResponse("Something is definitely wrong", 400));
            }
        } catch (error) {
            next(error);
        }
    }
    static async logoutUser(req:Request,res:Response,next:NextFunction){
        try{
            res.clearCookie("Token");
            res.status(200).json({
                message:"User logout Sucessfully"
            });
        }catch(error){
            next(error);
        }
    }
    static async getUser(req:Request,res:Response,next:NextFunction){
        try{
            const user=await AuthRepository.findUserByID(req.body.userID);
            if(!user){
                next(Service.CreateErrorResponse("User not found",400));
            }
            res.status(200).json({
                user,
                "message":"User fetched sucessfully"
            });
        }catch(error){
            next(error);
        }
    }
}
