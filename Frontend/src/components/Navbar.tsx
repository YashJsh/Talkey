import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { authState, checkAuthState } from "../store/userAuthStore";
import { useEffect } from "react";

const Navbar = () => {
  const checkAuth = useRecoilValueLoadable(checkAuthState); // Trigger the selector computation
  const setAuthStates = useSetRecoilState(authState);

  useEffect(() => {
    if (checkAuth.state === "hasValue") {
      setAuthStates(checkAuth.contents as any);
    }
    if (checkAuth.state === "hasError"){
      setAuthStates((prevState) => ({
        ...prevState,
        isCheckingAuth : false,
      }))
    }
  }, [checkAuth, setAuthStates]);

  return (
    <div>
        Navbar
    </div>

  )
}

export default Navbar