import { FC, ReactElement } from "react";
import { IMessageType } from "../../interface/IMessageType";
import { AuthState } from "../../state/authState";
import { ConversationState } from "../../state/conversationState";
const Message: FC<IMessageType> = (props): ReactElement => {
    const { user } = AuthState();
    const {selectedConversation}=ConversationState();
    const { body, senderID, createdAt } = props;
    const dateObject = new Date(createdAt);
    const isSentByMe = senderID === user.id;
    const img=isSentByMe?user.profilePicture:selectedConversation?.profilePicture;
    const bgBlue=isSentByMe?"bg-blue-500":"";
    const chatPosition=isSentByMe?"chat-end":"chat-start";
    return (
        <div className={`chat ${chatPosition}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={img}
                        alt="chat bubble"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bgBlue}`}>{body}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {dateObject.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })}
            </div>
        </div>
    );
};

export default Message;
