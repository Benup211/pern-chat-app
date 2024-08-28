export interface IMessageType {
    id:string;
    body:string;
    senderID:string;
    conversationID:string;
    createdAt:string;
    updatedAt:string;
    shouldShake?:boolean;
}