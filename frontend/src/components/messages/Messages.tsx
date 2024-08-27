import { IMessageType } from "../../interface/IMessageType";
import Message from "./Message"
import {FC,ReactElement} from 'react';
const Messages:FC<{ allmessages: IMessageType[] }> = (props):ReactElement => {
  const {allmessages}=props;
  return (
    <div className="px-4 flex-1 overflow-auto">
      {allmessages.map((message:IMessageType,index:number)=><Message key={index} {...message}/>)}
      {(allmessages.length===0)&&<>
        <div className="text-center text-gray-500 mt-2 text-sm">No Messages</div>
        <div className="text-center text-gray-500 mt-2">Write message to start conversation</div>
      </>}
    </div>
  )
}

export default Messages