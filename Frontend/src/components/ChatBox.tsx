import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/userChatStore";
import ChatHeader from "./ChatHeader";
import { authStore } from "../store/userAuthStore";
import MessageSkeleton from "./Skeleton/MessageSkeleton";

const ChatBox = () => {
  const { messages, getMessage, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser, isCheckingAuth } = authStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessage(selectedUser?._id as string);
    subscribeToMessages();
    return()=>unsubscribeFromMessages(); 
  }, [selectedUser?._id, getMessage, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  
  if (isMessageLoading || isCheckingAuth) return (
    <div className="flex-1 flex flex-col overflow-auto h-screen">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );


  return (
    <div className="w-full h-screen flex flex-1 flex-col  bg-base-200/30 pt-16">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
          > 
            <div className="chat-image avatar"> 
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectedUser?.profilepic || "/avatar.png "
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Unknown time"}
              </time>
            </div>
            <div className="chat-bubble h-auto flex flex-col  bg-base-300/80 text-base-content/90">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            <div ref={messagesEndRef}></div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
