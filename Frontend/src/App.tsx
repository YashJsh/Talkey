import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import {Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/signup" element = {<SignUpPage/>}/>
        <Route path = "/signin" element = {<SignInPage/>}/>
        <Route path = "/settings" element = {<SettingsPage/>}/>
        <Route path = "/profile" element = {<ProfilePage/>}/>
      </Routes>
    </>
  );
}
export default App;
