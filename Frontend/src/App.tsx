import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { authStore } from "./store/userAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useTheme } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth} = authStore();
  const {theme} = useTheme();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && authUser===null)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
  );

  return (
    <div data-theme = {theme}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}
export default App;
