import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent } from "./ui/dialog";
import React from "react";
const CommentDialog = ({ open, setOpen }) => {
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
                                    <span className="text-gray-600 text-sm">Bio here ....</span>
                                </div>
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