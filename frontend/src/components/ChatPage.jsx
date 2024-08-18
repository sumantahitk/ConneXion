import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircle, MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';


const ChatPage = () => {
    const [message,setMessage]=useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const {messages}=useSelector(store=>store.chat);
    const {onlineUsers}=useSelector(store=>store.chat);

    const sendMessageHandler= async(receiverId)=>{
        try{
            const res=await axios.post(`https://connexion-67zf.onrender.com/api/v1/message/send/${receiverId}`,
               {message},
                {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            );
            if(res.data.success)
            {
                dispatch(setMessages([...messages,res.data.newMessage]));
                setMessage("");
            }
        }catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        return ()=>{
            dispatch(setSelectedUser(null));
        }
    },[]);
    return (
        <div className='flex ml-[21%] h-screen'>
            <section className='w-full md:w-1/4 my-8'>
                <div className='flex pr-12 pl-5'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={user?.profilePicture} alt="profilePhoto" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                </div>
                    <br></br>
                <hr className='mb-4  border-gray-300' />
                <div className='overflow-y-auto pl-3 h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline=onlineUsers.includes(suggestedUser?._id);
                            // const isOnline=true;
                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'online' : 'offline'}</span>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>
            {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-300  flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>
                        <hr className='mb-4  border-gray-300' />
                        <Messages selectedUser={selectedUser}/>
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <Input value={message} onChange={(e)=>setMessage(e.target.value)} type='text' className='flex-1 mr-2 focus visible:ring-transparent' placeholder='Messages...' />
                            <Button onClick={()=> sendMessageHandler(selectedUser?._id)}>Send</Button>
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4'/>
                        <h1 className='font-medium text-xl'>Your Messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}
export default ChatPage;