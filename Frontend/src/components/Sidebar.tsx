import { useEffect, useState } from "react";
import { useChatStore } from "../store/userChatStore";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { authStore } from "../store/userAuthStore";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, isUserLoading } = useChatStore();

  const {onlineUsers} = authStore();
  const [showOnlineOnly, setOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
  const filteredUser = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-screen w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 pt-20">
      <div className="border-b border-base-300 w-full px-3 h-screen">
        <div className="flex items-center gap-2 px-3">
          <Users />
          <span className="hidden lg:block">Contacts</span>
        </div>
        {/* Online filter*/}
        <div className="mt-3 hidden lg:flex items-center gap-2 px-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" 
              checked={showOnlineOnly}
              onChange={(e)=>setOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online Only</span>
          </label>
          <span>({onlineUsers.length - 1 }  online)</span>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filteredUser.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
              }}
              className={`w-full py-3 flex items-center gap-3 hover:bg-base-300 s rounded-lg px-1 `}
            > 
              
              <div className="relative mx-auto lg:max-0">
                <img
                  src={user.profilepic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12"
                
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-xs text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                  
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
