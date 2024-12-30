import mongoose from "mongoose";

export interface UserSchema{
    email: string;
    fullName : string,
    password: string,
    profilepic : string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  profilepic: {
    type: String,
    default: "",
  },
},{ timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;