import { IMessageType } from "../../interface/IMessageType";
import { ConversationState } from "../../state/conversationState";
import { SocketState } from "../../state/SocketState";
import Message from "./Message"
import { FC, ReactElement, useEffect, useRef } from 'react';

const Messages: FC<{ allmessages: IMessageType[] }> = (props): ReactElement => {
  const { allmessages } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);
const {messages,setMessages}=ConversationState();
const {socket}=SocketState();
  useEffect(() => {
    scrollToBottom();
  }, [allmessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(()=>{
    socket?.on('newMessage',(newMessage:IMessageType)=>{
      newMessage.shouldShake=true;
      setMessages([...messages,newMessage]);

      return()=>{
        socket?.off('newMessage');
      }
    });
  },[socket,messages,setMessages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {allmessages.map((message: IMessageType, index: number) => <Message key={index} {...message} />)}
      {(allmessages.length === 0) && <>
        <div className="text-center text-gray-500 mt-2 text-sm">No Messages</div>
        <div className="text-center text-gray-500 mt-2">Write message to start conversation</div>
      </>}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages;