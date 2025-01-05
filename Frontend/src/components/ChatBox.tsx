import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/userChatStore";
import ChatHeader from "./ChatHeader";
import { authStore } from "../store/userAuthStore";

const ChatBox = () => {
  const { messages, getMessage, isMessageLoading, selectedUser } =
    useChatStore();
  const { authUser } = authStore();

  useEffect(() => {
    getMessage(selectedUser?._id as string);
  }, [selectedUser?._id, getMessage]);

  if (isMessageLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen flex flex-1 flex-col  bg-base-300/50 pt-16">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png "
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
            <div className="chat-bubble h-auto flex">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
