import { useRef, useState} from "react"
import { useChatStore } from "../store/userChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {sendMessages} = useChatStore();

    const handleImageChange = (e : any) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please select an image file only")
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string) ;
        }
        reader.readAsDataURL(file);

    }

    const removeImage = ()=>{
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
    const handleSendMessage = async (e : any)=>{
         e.preventDefault();
         if(!text.trim() &&  !imagePreview ) return;
         try{
            await sendMessages({
                text: text.trim(), 
                image: imagePreview || undefined, 
            });
         }catch(error){
            console.error("Failed to send messages :" , error);
         }
    }
  return (
    <div className="p-4 w-full">
        {imagePreview && (
            <div className="mb-3 flex itmes-center gap-2">
                <div className="relative">
                    <img src={imagePreview} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700"/>
                    <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300" type="button" title="Remove image">
                        <X className="size-3"/>
                    </button>
                </div>
            </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="flex flex-1 gap-2">
                <input type="file"
                    accept = "image/*"
                    className="hidden"
                    ref = {fileInputRef}
                    onChange= {handleImageChange}
                    title="getImage"
                />
                <button type="button"
                    className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400" }`}
                    title="Attach image"
                    onClick={()=>fileInputRef.current?.click()}
                >
                    <Image/>
                </button>
                <input type="text" 
                    className="w-full input input-bordered rounded-2xl input-sm sm:input-md"
                    placeholder="Type"
                    value = {text}
                    onChange={(e)=>setText(e.target.value)}
                />
            </div>
            <button className="btn btn-sm btn-circle" title="submit"
                disabled = {!text.trim() && !imagePreview}
            >
                <Send/>
            </button>
        </form>
    </div>
  )
}

export default MessageInput