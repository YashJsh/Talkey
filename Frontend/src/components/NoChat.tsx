import { MessageSquare } from "lucide-react";

const NoChat = () => {
  return (
    <div className="w-full h-screen flex flex-1 flex-col items-center justify-center bg-base-300/50 ">
      <div className="max-w-md text-center ">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquare />
            </div>
          </div>
        </div>

        {/* welcome */}
        <h2 className="text-2xl font-bold">Welcome to Talkely</h2>
        <p className="text-base-content/40">Click on anyone to start the chat</p>
      </div>
    </div>
  );
};

export default NoChat;
