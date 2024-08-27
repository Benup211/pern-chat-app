import { useEffect } from 'react';
import { ConversationState } from '../../state/conversationState'
import Conversation from './Conversation'
const Conversations = () => {
  const{conversations,getConversation,isFetchingConversation}=ConversationState();
  useEffect(()=>{
    getConversation();
  },[])
  if(isFetchingConversation) return <span className='loading loading-spinner mx-auto'/>
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation,index)=><Conversation key={index} {...conversation}/>)}
    </div>
  )
}

export default Conversations