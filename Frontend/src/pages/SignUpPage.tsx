import { useState } from "react";
import { authState } from "../store/userAuthStore";
import { useRecoilState } from "recoil";
import {
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthPattern from "../components/AuthPattern";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../axios/axios";
import toast from "react-hot-toast";

const SignUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setAuth((prevAuth) => ({ ...prevAuth, isSigningUp: true }));
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      if(response.status === 201){
        toast.success("Account Created Successfully");
        navigate("/");
      }
    } catch (error : any) {
      toast.error(error.response.data.message);
    }finally{
      setAuth((prevAuth) => ({ ...prevAuth, isSigningUp: false }));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group ">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/4">
                Get started with your free account
              </p>
            </div>
          </div>
    
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span>Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <User />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className="pl-10 w-full input input-bordered"
                />
              </div>
              {errors.fullName && (
                  <p className="text-red-500 text-sm pl-2 pt-2">{errors.fullName.message}</p>
                )}
            </div>

            <div className="form-control">
              <label className="label">
                <span>Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Mail />
                </div>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                  className="pl-10 w-full input input-bordered"
                />
              </div>
              {errors.email && (
                  <p className="text-red-500 text-sm pl-2 pt-2">{errors.email.message}</p>
                )}
            </div>

            <div className="form-control">
              <label className="label">
                <span>Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Lock />
                </div>
                <input
                  type={showPassword ? `text` : `password`}
                  placeholder="johndoe@gmail.com"
                  {...register("password")}
                  className="pl-10 w-full input input-bordered"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-2 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                  <p className="text-red-500 text-sm pl-2 pt-2">{errors.password.message}</p>
                )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={auth.isSigningUp}
            >
              {auth.isSigningUp ? (
                <>
                  <Loader className="animate-spin" /> Loading...
                </>
              ) : (
                <p>Create Account </p>
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">Already have an account? </p>
            <Link to="/signin" className="text-primary underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <AuthPattern
          title="Join our community"
          subtitle="Connect with friends, share moments and laughter"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
