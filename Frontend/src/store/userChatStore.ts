import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios/axios";
import { User } from "./userAuthStore";

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
  }
  
  interface ChatStoreState {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUserLoading: boolean;
    isMessageLoading: boolean;
    getUsers: () => Promise<void>;
    getMessage: (userId: string) => Promise<void>;
    setSelectedUser: (selectedUser: User) => void;
  }

export const useChatStore = create<ChatStoreState>((set) => ({
    messages : [],
    users : [],
    selectedUser : null,
    isUserLoading : false,
    isMessageLoading : false,

    getUsers: async ()=>{
        set({isUserLoading : true});
        try{
            const response = await axiosInstance.get<User[]>("/messages/users");
            set({users : response.data })
        }catch(error : any){
            toast.error(error.response.data.message);
        }finally {
            set({ isUserLoading : false})
        }
    },

    getMessage : async(userId : string)=>{
        set({isMessageLoading : true});
        try{
            const response = await axiosInstance.get<Message[]>(`/messages/${userId}`)
            set({ messages : response.data})
        }
        catch(error : any){
            toast.error(error.response.data.message);
        }finally{
            set({ isMessageLoading : false})
        }
    },

    setSelectedUser : async(selectedUser : User)=>{
        set({selectedUser})
    }
}));