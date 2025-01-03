import { useEffect } from "react";
import { useChatStore } from "../store/userChatStore";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { User } from "../store/userAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();

  const onlineUser: string[] = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 pt-20">
      <div className="border-b border-base-300 w-full px-3">
        <div className="flex items-center gap-2 px-3">
          <Users />
          <span className="hidden lg:block">Contacts</span>
        </div>
        {/* Online filter*/}
        <div className="overflow-y-auto w-full py-3">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
              }}
              className={`w-full py-3 flex items-center gap-3 hover:bg-base-300 transition-colors rounded-lg px-1 `}
            >
              <div className="relative mx-auto lg:max-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12"
                />
                {onlineUser.includes(user._id) && (
                  <span className="absoulte bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-xs text-zinc-400">
                  {onlineUser.includes(user._id) ? "Online" : "Offline"}
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
