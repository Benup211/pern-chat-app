import {BsSend} from 'react-icons/bs'
import { ConversationState } from '../../state/conversationState'
import { useState } from 'react';
const MessageInput = () => {
  const [message,setMessage]=useState('');
  const {selectedConversation,isSendingMessage,sendMessage,messages,setMessages}=ConversationState();
  const handleSendSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      if(message.trim()==='') return;
      const mesageSuceessData= await sendMessage(message,selectedConversation?.id);
      setMessages([...messages,mesageSuceessData]);
      setMessage('');
    }catch(error){
      console.error(error);
    }
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSendSubmit}>
        <div className="w-full relative">
            <input type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" placeholder="Send a message" value={message} onChange={(e)=>{setMessage(e.target.value)}} disabled={isSendingMessage}/>
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>{isSendingMessage?<span className="loading loading-spinner mx-auto my-auto" />:<BsSend/>}</button>
        </div>
    </form>
  )
}

export default MessageInput