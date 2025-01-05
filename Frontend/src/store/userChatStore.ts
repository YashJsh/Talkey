import { create, useStore } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios/axios";
import { User } from "./userAuthStore";
import { get } from "axios";

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    text?: string; // Optional since `text` or `image` might be used
    image?: string ; // URL of the uploaded image
    timestamp: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface SendMessagePayload {
    text?: string; // Optional for cases where there's only an image
    image?: string; // Optional for cases where there's only text
  }
  

interface sendMessage{
    text : string;
    image : string | null;
}

interface GetMessageResponse {
  message: string;
  data: Message[];
}

interface ChatStoreState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;
  getUsers: () => Promise<void>;
  getMessage: (userId: string) => Promise<void>;
  sendMessages: (messageData : SendMessagePayload) => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get<User[]>("/messages/users");
      set({ users: response.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId: string) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get<GetMessageResponse>(
        `/messages/${userId}`
      );
      console.log(response.data.data);
      set({ messages: response.data.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessages: async (messageData: SendMessagePayload) => {
    const { selectedUser } = useChatStore.getState();

    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set((state) => ({
        messages : [...state.messages, response.data as Message]
      }))
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: async (selectedUser: User | null) => {
    set({ selectedUser });
  },
}));
