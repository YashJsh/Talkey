import { useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authState, checkAuthState, logout} from "../store/userAuthStore";
import { Loader, LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useRecoilValue(authState);
  const signOut  = useRecoilValue(logout);
  return (
    <header className="bg-base-100 border-b border-base-200 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center text-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="rounded-lg flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Talkely</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="flex items-center btn btn-sm transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {auth.authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center btn btn-sm transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={()=>{signOut}}>
                  <LogOut className="w-4 h-4"></LogOut>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/*
  const { authUser, isCheckingAuth } = useRecoilValue(authState);
  const checkAuth = useRecoilValueLoadable(checkAuthState);

  useEffect(()=> {
    checkAuth;
  }, [checkAuth]);

  if (!isCheckingAuth && !authUser) {
    return <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>;
*/
