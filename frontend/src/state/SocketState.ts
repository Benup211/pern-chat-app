import { create } from "zustand";
import io,{Socket} from "socket.io-client";

interface ISocketState {
    socket: Socket | null;
    onlineUsers: string[];
    connectSocket:(userID:string)=>void;
    disconnectSocket:()=>void;
}
const socketURL = "http://localhost:3000";
export const SocketState = create<ISocketState>((set) => ({
    socket: null,
    onlineUsers: [],
    connectSocket: (userID) => {
        const socket = io(socketURL, {
            query: {
                userID
            }
        });
        socket.on("connect", () => {
            set({socket})
        });
        socket.on("getOnlineUsers", (users: string[]) => {
            set({ onlineUsers: users });
        });
        socket.on("disconnect", () => {
            set({socket:null});
        });
        set({ socket });
    },
    disconnectSocket: () => {
        set((state) => {
          if (state.socket) {
            state.socket.disconnect();
          }
          return { socket: null, onlineUsers: [] };
        });
      },
}));