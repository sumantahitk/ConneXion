import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';

const Profile = () => {
    const params = useParams();//to fetch the req id;
    const userId = params.id;

    useGetUserProfile(userId);
    const [activeTab, setActiveTab] = useState('posts');
    const { userProfile ,user} = useSelector(store => store.auth);
    // console.log(userProfile);
    const isLoggedInUserProfile = user?._id===userProfile?._id;
    const isFollow = false;
    const handelTabChange = (tab) => {
        setActiveTab(tab);
    }
    const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;
    return (
        <div className='flex max-w-5xl justify-center mx-auto pl-10'>
            <div className='flex flex-col gap-20 p-8'>
                <div className='grid grid-cols-2'>
                    <section className='flex items-center justify-center'>
                        <Avatar className='h-32 w-32'>
                            <AvatarImage src={userProfile?.profilePicture} alt="profilePhoto" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </section>
                    <section>
                        <div className='flex flex-col gap-5'>
                            <div className='flex itms-center gap-2'>
                                <span>{userProfile?.username}</span>
                                {
                                    isLoggedInUserProfile ? (

                                        <>
                                            <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit Profile</Button></Link>
                                            <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                                            <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                                        </>
                                    ) : (
                                        isFollow ? (

                                            <> <Button variant='secondary' className=' h-8'>Unfollow</Button>
                                                <Button variant='secondary' className='h-8'>Message</Button>
                                            </>

                                        ) :
                                            (
                                                <Button className='bg-[#0095F6] hover:bg-[#3192d2]  h-8'>Follow</Button>

                                            )
                                    )
                                }
                            </div>
                            <div className='flex items-center gap-4'>
                                <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                                <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                                <Badge className='w-fit' variant='secondary'><AtSign /><span className='pl-1'>{userProfile?.username}</span></Badge>
                                <span>👨‍💻Love coding</span>
                                <span>⛰taveling</span>
                                <span>📸Photography</span>
                                <span>🎨Sketching</span>
                                <span>🏏Playing Cricket</span>

                            </div>
                        </div>
                    </section>
                </div>
                <div className='pl-5  border-t border-t-gray-200'>
                    <div className='flex items-center  justify-center gap-10 text-sm'>
                        <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handelTabChange('posts')}>
                            POSTS
                        </span>
                        <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handelTabChange('saved')}>
                            SAVED
                        </span>
                        <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handelTabChange('saved')}>
                            REELS
                        </span>
                        <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handelTabChange('saved')}>
                            TAGS
                        </span>
                    </div>
                    <div className='grid grid-cols-3 gap-1 pl-2'>
                        {
                            displayedPost?.map((post) => {
                                return (
                                    <div key={post?._id} className='relative group cursor-pointer'>
                                        <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                                        <div className='absolute inset-0 flex items-center justify-center  bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 '>
                                            <div className='flex  items-center text-white  space-x-4'>
                                                <button className='flex items-center  gap-2 hover:text-gray-300'>
                                                    <Heart />
                                                    <span>{post?.likes.length}</span>
                                                </button>
                                                <button className='flex items-center gap-2 hover:text-gray-300'>
                                                    <MessageCircle />
                                                    <span>{post?.comments.length}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;