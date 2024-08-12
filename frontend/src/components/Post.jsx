import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useState } from "react";
import { DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
const Post = () => {
    const [text,setText]=useState("");
    const [open,setOpen]=useState(false);
    const changeEnevtHandler=(e)=>{
        const inputText=e.target.value;
        if(inputText.trim()){
            setText(inputText);
        }else{
            setText("");
        }
    }
    return (
        <div className="my-8 w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar >
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>username</h1>
                </div>
                <Dialog >
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit '>Add to favorites</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit '>Delete</Button>

                    </DialogContent>
                </Dialog>
            </div>
            <img
                className="rounded-sm my-2 w-full aspect-square object-cover"
                src="https://images.unsplash.com/photo-1721297013834-83e997155c72?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzJ8fHxlbnwwfHx8fHw%3D"
                alt="post_image" />
           
           
           <div className="flex items-center justify-between px-1 my-2">
                <div className="flex items-center gap-5">
                    <FaRegHeart size={"27px"} />
                    <MessageCircle onClick={()=>setOpen(true)} className="cursor-pointer hover:text-gray-600 w-7 h-7" />
                    <Send className="cursor-pointer hover:text-gray-600 w-7 h-7" />
                </div>
                <Bookmark className="cursor-pointer hover:text-gray-600 w-7 h-7"/>
            </div>
           <span className="font-medium block mb-2">1K likes</span>
           <p>
            <span className="font-medium mr-2">username</span>
                caption
           </p>
           <span onClick={()=>setOpen(true)} className="cursor-pointer text-sm text-gray-400">View all 10 comments</span>
           <CommentDialog open={open} setOpen={setOpen}/>
           <div className="flex items-center justify-between px-1 my-2">
            <input
                type="text"
                placeholder="Add a comment..."
                value={text}
                onChange={changeEnevtHandler}
                className="outline-none text-sm w-full"
            />
            {
                text && <span className='text-[#3BADF8]'>Post</span>
            }
           
           </div>
        </div>
    )
}

export default Post;