import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
const CommentDialog = ({ open, setOpen }) => {
    const [text,setText]=useState("");
    const changeEventHandler=(e)=>{
        const inputText=e.target.value;
        if(inputText.trim()){
            setText(inputText);
        }else{
            setText("");
        }
    }

    const sendMessageHandeler= async()=>{
        alert(text);
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-2xl p-0 flex flex-col">
                    <div className="flex flex-1">
                        <div className="w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1721297013834-83e997155c72?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzJ8fHxlbnwwfHx8fHw%3D"
                                alt="post_image"
                                className="w-full h-full object-cover rounded-lg"
                            />

                        </div>
                        <div className="w-1/2 flex flex-col justify-between">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex gap-3 items-center">
                                    <Link>
                                        <Avatar>
                                            <AvatarImage src="" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <Link className="font-semibold text-xs">username</Link>
                                        {/* <span className="text-gray-600 text-sm">Bio here ....</span> */}
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent className="flex flex-col items-center text-sm text-center">
                                        <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                                            Unfollow
                                        </div>
                                        <div className="cursor-pointer w-full ">
                                            Add to Favorites
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <hr />
                            <div className="flex-1 overflow-y-auto max-h-96 p-4">
                                comments
                            </div>
                            <div className="p-4">
                                <div className="flex item-center gap-2">
                                    <input type="text" onChange="changeEventHandler" placeholder="Add a comment..." className="w-full outline-none border border-gray-300 p-2 rounded" />
                                    <Button disabled={!text.trim()} onClick={sendMessageHandeler} variant="outline">Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CommentDialog;