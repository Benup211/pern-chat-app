import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import { ConversationState } from "../../state/conversationState";
import { useEffect } from "react";
const MessageContainer = () => {
    const { selectedConversation, messages, getMessages, isFetchingMessages } =
        ConversationState();
    useEffect(() => {
        if (selectedConversation) {
            getMessages(selectedConversation.id);
        }
    }, [selectedConversation]);
    if (isFetchingMessages)
        return (
            <>
                <div className="md:min-w-[450px] flex flex-col">
                    <span className="loading loading-spinner mx-auto my-auto" />
                </div>
            </>
        );
    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text">To:</span>{" "}
                        <span className="text-gray-900 font-bold">
                            {selectedConversation.fullName}
                        </span>
                    </div>
                    <Messages allmessages={messages} />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;
