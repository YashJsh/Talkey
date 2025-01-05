import { Request, Response, RequestHandler } from "express";
import { connectDB } from "../lib/db";
import UserModel from "../models/user.modals";
import messageModel from "../models/message.model";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

export const getUsersForSidebar: RequestHandler = async (
  req: Request,
  res: Response
) => {
  await connectDB();
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
    return;
  } catch (error: any) {
    console.error("Error in getUsersForSidebar", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  await connectDB();
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res
      .status(200)
      .json({ message: "Messages fetched successfully", data: messages });
  } catch (error) {
    console.log("Error in fetching messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  await connectDB();
  try {
    const { text, image } = req.body;
    const { id : receiverId} = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if( image ){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image : imageUrl
    })

    await newMessage.save();
   
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }


    res.status(201).json({message : "Message Received", data : newMessage});
  } catch (error) {
    console.log("Error in Sending messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}