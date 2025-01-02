import { atom, selector } from "recoil";
import { axiosInstance } from "../axios/axios";
import toast from "react-hot-toast";

interface User{
    _id : string
    email: string;
    fullName : string,
    password: string,
    profilepic : string
}

interface AuthState {
    authUser : User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
}

export const authState = atom<AuthState>({
    key: 'authState', 
    default: {
        authUser:null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth:true,
    }
});

export const checkAuthState = selector({
    key : 'checkAuthState',
    get : async ({get}) => {
        const state = get(authState);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          return{
            ...state
          }
        }
        try{
            const res = await axiosInstance.get("/auth/checkAuth" , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { 
                ...state,
                authUser : res.data,
                isCheckingAuth: false,
            }
        }catch (error){
            console.error("Error checking auth:", error);
            return { 
                ...state,
                authUser : null,
                isCheckingAuth: false
            }
        }
    } 
})


export const logout = selector({
    key : 'logout',
    get : async ({get}) => {
        const state = get(authState);
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");
            return { 
                ...state,
                authUser : null
            }
          } catch (error : any) {
            toast.error(error.response.data.message);
          }
    }
})