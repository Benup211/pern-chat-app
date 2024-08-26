import prisma from '../db/prisma';

export class AuthRepository{

    static async findUserByUsername(username:string){
        return await prisma.user.findUnique({ where: { username } });
    }
    static async findUserByID(id:string){
        return await prisma.user.findUnique({where:{id:id},select:{
            id:true,username:true,gender:true,profilePicture:true
        }})
    }
    static async createUser(username:string,fullName:string,password:string,gender:'male' | 'female',profilePicture:string){
        return await prisma.user.create({
            data: {
                username:username,
                fullName:fullName,
                password:password,
                gender:gender,
                profilePicture:profilePicture
            },
        });
    }
}