
import { Heart, HeartIcon, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { setLikeNotification } from '@/redux/rtnSlice';



const LeftSidebar = () => {
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const logountHandler = async () => {
        try {
            const res = await axios.get('https://connexion-67zf.onrender.com/api/v1/user/logout', {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    // const likeHandler= ()=>{
    //     dispatch(setLikeNotification([]));
    // }
        const sidebarHandler = async (textType) => {
        // alert(textType);
        if (textType === 'Logout') {
            logountHandler();
        }
        else if (textType === 'Create') {
            setOpen(true);
        }
        else if (textType === 'Profile') {
            navigate(`/profile/${user?._id}`);
        }
        else if (textType === 'Home') {
            navigate(`/`);
        }
        else if (textType === 'Messages') {
            navigate(`/chat`);
        }
        
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-7 h-7'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },

    ]

    return (
        <div className='fixed top-0 z-10 left-5 px-4 border-r border-grey-300 w-[19%] h-screen'>
            <div className='flex flex-col'>
                <h1 className='text-center font-bold my-4 text-xl '>ConneXion</h1>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                    {
                                        item.text === 'Notifications' && likeNotification.length > 0 && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button  size='icon' className='rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6'>{likeNotification.length}</Button>

                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div>
                                                        {
                                                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                likeNotification.map((Notification) => {
                                                                    return (
                                                                        <div key={Notification.userId} className='flex items-center gap-2 my-2'>
                                                                            <Avatar>
                                                                                <AvatarImage src={Notification.userDetails?.profilePicture} />
                                                                                <AvatarFallback>CN</AvatarFallback>
                                                                              
                                                                            </Avatar>
                                                                            <p className='text-sm'><span className='font-bold'>{Notification.userDetails?.username}</span> Liked your post</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    )
}

export default LeftSidebar;