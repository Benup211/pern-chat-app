import { create } from "zustand"
import { IConversationState } from "../interface/IConversationState";
const API_URL="http://localhost:3000/api/message";
export const ConversationState = create<IConversationState>((set)=>({
    selectedConversation:null,
    messages:[],
    setSelectedConversation:(conversation)=>{
        set({selectedConversation:conversation})
    },
    setMessages:(messages)=>{
        set({messages:messages})
    },
    conversations:[],
    isFetchingConversation:false,
    isFetchingMessages:false,
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
            console.error(error);
        }
    }
}));