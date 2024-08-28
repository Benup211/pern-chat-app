import { IConversationType } from "./IConversationType";
import { IMessageType } from "./IMessageType";
export interface IConversationState{
    selectedConversation:IConversationType|null;
    messages:IMessageType[];
    setSelectedConversation:(conversation:IConversationType|null)=>void;
    setMessages:(messages:IMessageType[])=>void;
    conversations:IConversationType[];
    getConversation:Function;
    getMessages:Function;
    isFetchingConversation:boolean;
    isFetchingMessages:boolean;
    isSendingMessage:boolean;
    sendMessage:Function;
}