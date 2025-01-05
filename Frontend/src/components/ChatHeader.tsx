import React from 'react'
import { useChatStore } from '../store/userChatStore'
import { authStore } from '../store/userAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();

  return (
    <div className="p-2.5 border-b border-base-100 bg-base-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar">
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName}/>
                    </div>
                </div>

                {/* User info */}
                <div>
                    <h3 className="font-medium">{selectedUser?.fullName}</h3>
                </div>
                </div>
                {/* Close Button */}
                <button onClick={() => setSelectedUser(null)} title='Close'><X/></button>
            
        </div>    
    </div>
  )
}

export default ChatHeader