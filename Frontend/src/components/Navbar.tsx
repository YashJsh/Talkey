import { useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable} from "recoil";
import { authState, checkAuthState } from "../store/userAuthStore";
import {Loader} from "lucide-react"

const Navbar = () => {
  const { authUser, isCheckingAuth } = useRecoilValue(authState);
  const checkAuth = useRecoilValueLoadable(checkAuthState);

  useEffect(()=> {
    checkAuth;
  }, [checkAuth]);

  if (!isCheckingAuth && !authUser) {
    return <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>;
  }
  return <div>Navbar</div>;
};

export default Navbar;
