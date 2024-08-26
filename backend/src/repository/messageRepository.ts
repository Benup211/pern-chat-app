import prisma from "../db/prisma";
export class MessageRepository {
    static async FindAllUser(userID: string) {
        return await prisma.user.findMany({
            where: {
                id: {
                    not: userID,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePicture: true,
            },
        });
    }
    static async AllConversation(senderID: string, userToChat: string) {
        return await prisma.conversation.findFirst({
            where: {
                participantIDs: {
                    hasEvery: [senderID, userToChat],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
    }
    static async findConversation(senderID: string, receiverID: string) {
        return await prisma.conversation.findFirst({
            where: {
                participantIDs: {
                    hasEvery: [senderID, receiverID],
                },
            },
        });
    }
    static async CreateConversation(senderID: string, receiverID: string) {
        return await prisma.conversation.create({
            data: {
                participantIDs: {
                    set: [senderID, receiverID],
                },
            },
        });
    }
    static async CreateMessage(
        message: string,
        senderID: string,
        conversationID: string
    ) {
        return await prisma.message.create({
            data: {
                senderID,
                body: message,
                conversationID: conversationID,
            },
        });
    }
    static async UpdateConversation(conversationID: string, messageID: string) {
        return await prisma.conversation.update({
            where: {
                id: conversationID,
            },
            data: {
                messages: {
                    connect: {
                        id: messageID,
                    },
                },
            },
        });
    }
}
