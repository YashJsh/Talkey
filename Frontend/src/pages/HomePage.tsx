
import ChatBox from "../components/ChatBox"
import Navbar from "../components/Navbar"
import NoChat from "../components/NoChat"
import Sidebar from "../components/Sidebar"
import { useChatStore } from "../store/userChatStore"


const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <>
      <Navbar/>
      <div className=" bg-base-200 ">
          <div className="flex items-center justify-center">
              <div className="container w-full ">
                <div className="flex rounded-lg overflow-hidden">
                  <Sidebar/>
                  {!selectedUser? <NoChat/> : <ChatBox/>}
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default HomePage