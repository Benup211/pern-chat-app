import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import {useEffect} from "react";
import { SocketState } from "../state/SocketState";
import { AuthState } from "../state/authState";
const Home = () => {
    const {user}=AuthState();
    const {connectSocket,disconnectSocket}=SocketState();
    useEffect(()=>{
        if(user.id!==''){
            connectSocket(user.id);
        }
        return ()=>{
            disconnectSocket();
        }
    },[])
    return (
        <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg">
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;
