import { create } from "zustand"
import { IConversationState } from "../interface/IConversationState";
const API_URL="http://localhost:3000/api/message";
export const ConversationState = create<IConversationState>((set)=>({
    selectedConversation:null,
    messages:[],
    setSelectedConversation:(conversation)=>{
        set({selectedConversation:conversation})
    },
    setMessages:(newmessage)=>{
        set({messages: newmessage})
    },
    conversations:[],
    isFetchingConversation:false,
    isFetchingMessages:false,
    isSendingMessage:false,
    getConversation:async()=>{
        set({isFetchingConversation:true})
        try {
            const response = await fetch(`${API_URL}/users`, {
            method: 'GET', 
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch conversations');
            }
            const data = await response.json();
            set({conversations: data, isFetchingConversation: false});
        } catch (error) {
            set({isFetchingConversation: false});
            console.error(error);
        }
    },
    getMessages:async(id:string)=>{
        set({isFetchingMessages:true})
        try {
            const response = await fetch(`${API_URL}/get/${id}`, {
            method: 'GET', 
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            set({messages: data, isFetchingMessages: false});
        } catch (error) {
            set({isFetchingMessages: false});
            console.error(error);
        }
    },
    sendMessage:async(message:string,receiverID:string)=>{
        set({isSendingMessage:true})
        try {
            const response = await fetch(`${API_URL}/send/${receiverID}`, {
            method: 'POST', 
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message})
            });
            if (!response.ok) {
            throw new Error('Failed to send message');
            }
            const data = await response.json();
            set({isSendingMessage: false});
            return data.newMessage;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}));