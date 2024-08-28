import {FC,ReactElement,useMemo} from 'react';
import { IConversationType } from '../../interface/IConversationType';
import { RandomEmojis } from './RandomEmojis';
import { ConversationState } from '../../state/conversationState';
import { SocketState } from '../../state/SocketState';
const Conversation :FC<IConversationType>= (props):ReactElement => {
    const {fullName,profilePicture}=props;
    const randomEmoji=useMemo(()=>RandomEmojis(),[])
    const {setSelectedConversation,selectedConversation}=ConversationState();
    const isSelected:boolean=selectedConversation?.id===props.id;
    const {onlineUsers}=SocketState();
    const isOnline=onlineUsers.includes(props.id);
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?'bg-sky-500':''}`}
    onClick={()=>setSelectedConversation(props)}
    >
        <div className={`avatar ${isOnline?'online':''}`}>
            <div className="w-12 rounded-full">
                <img src={profilePicture} alt={`${fullName} avatar`} />
            </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className='flex gap-3 justify-between'>
                <p className="font-bold text-gray-200">{fullName}</p>
                <span className="text-xl">{randomEmoji}</span>
            </div>
        </div>
    </div>
    <div className="divider my-0 py-0 h-1"/>
    </>
  )
}

export default Conversation