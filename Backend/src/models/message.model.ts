import mongoose from "mongoose";

export interface MessageSchema {
    senderId : mongoose.Types.ObjectId;
    receiverId :  mongoose.Types.ObjectId;
    text : string,
    image : string,
}


const MessageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "UserModel",
        required : true
    },
    text : {
        type : String
    },
    image : {
        type : String
    },
},
{timestamps : true}
);

const messageModel = mongoose.model("Message", MessageSchema);
export default messageModel; 
