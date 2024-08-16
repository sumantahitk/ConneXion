import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";


const RightSidebar = () => {
    
    const { user } = useSelector(store => store.auth);
    // console.log(user);
    return (
        <div className="w-fit my-10 pr-32">
            <div className="flex items-center gap-2">
                <Avatar >
                    <AvatarImage src={user?.profilePicture} alt="post_image" className='' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3">
                    <h1>{user?.username}</h1>
                    <span>{user?.bio || 'Bio here...'}</span>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar;