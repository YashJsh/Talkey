import { useRecoilState, useRecoilValue } from "recoil";
import { authState, updateProfile } from "../store/userAuthStore";
import Navbar from "../components/Navbar";
import { Camera, User } from "lucide-react";

interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

const ProfilePage = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const update = useRecoilValue(updateProfile);

  
  const handleImageUpload = async (e: FileInputEvent) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64image = reader.result as string;
      await update({ profilePic: base64image });
    };
  };
  return (
    <>
      <Navbar />
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8 ">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>
            {/* Image Upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={auth.authUser?.profilepic || "/avatar.png"}
                  alt="profile"
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0
                    bg-base-content hover:scale-105 
                    p-2 rounded-full cursor-pointer transition-all duration-200 ${
                      auth.isUpdatingProfile
                        ? "animate-pulse pointer-events-none"
                        : ""
                    } `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    title="Upload your profile picture"
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={auth.isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content/50 ">
                {auth.isUpdatingProfile
                  ? "Uploading..."
                  : "Click on the camera icon to upload your photo"}
              </p>
            </div>

            {/* User Info Section */}
            <div className="space-y-6">
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User/>
                    Full Name
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{auth.authUser?.fullName}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User/>
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{auth.authUser?.email}</p>
                </div>
            </div>

            {/* Account Info */}
            <div className="mt-6 bg-base-300 rounded-xl p-6 text-center">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700 ">
                    <span>Member Since</span>
                    <span>xxxxxxxx</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700 ">
                    <span>Account Status</span>
                    <span className="text-green-600">Active</span>
                  </div>
              </div>

            </div>
             
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
