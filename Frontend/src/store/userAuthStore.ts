import {create} from "zustand"
import { Socket, io }  from "socket.io-client"
import { axiosInstance } from "../axios/axios"
import { SignInSchema} from "../pages/SignInPage";
import { SignUpSchema } from "../pages/SignUpPage";
import toast from "react-hot-toast";
import * as z from 'zod'

export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
}

export interface Auth{
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket : Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: z.infer<typeof SignUpSchema>) => Promise<void>;
  signin: (data:z.infer<typeof SignInSchema>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const authStore = create<Auth>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket : null,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data as User});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data: z.infer<typeof SignUpSchema>) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data as User });
          toast.success(" Account created successfully");
          get().connectSocket();
        } catch (error : any) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
    },

    signin : async (data: z.infer<typeof SignInSchema>) => {
        set({isLoggingIn : true });
        try {
          const res = await axiosInstance.post("/auth/signin", data);
          console.log("response is ", res);
          set({ authUser: res.data as User });
          toast.success("Logged in successfully");
          get().connectSocket();
        } catch (error : any) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
          get().disconnectSocket();
          await axiosInstance.post("/auth/signOut");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error : any) {
          toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data : any) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data as User});
          toast.success("Profile updated successfully");
        } catch (error : any) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
      const { authUser, socket } = get();
      if (!authUser || socket?.connected) return;  // Prevents reconnection if socket is already connected.
      
      const socketInstance = io("http://localhost:3000", {
        query: { userId: authUser._id }
      });
      
      socketInstance.connect();

      set({ socket: socketInstance });
   
      socketInstance.on("getOnlineUsers", (userIds: string[]) => {
        set(({ onlineUsers: userIds }));
      });
   },
   

    disconnectSocket: () => {
      if(get().socket?.connected) get().socket?.disconnect();
    },
}))