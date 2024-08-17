import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";


const EditProfile = () => {
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input,setInput]=useState({
        profilePicture:user?.profilePicture,
        bio:user?.bio,
        gender:user?.gender
    });
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const fileChnageHandeler=(e)=>{
        const file=e.target.files?.[0];
        if(file) setInput({...input,profilePicture:file});

    }

    const selectChangeHandler=(value)=>{
        setInput({...input,gender:value});
    }

    const editProfileHandler = async () => {
        const formData= new FormData();
        formData.append("bio",input.bio);
        formData.append("gender",input.gender);
        if(input.profilePicture)
        {
            formData.append("profilePicture",input.profilePicture);
        }

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit',
                formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },withCredentials:true
                }
            );
            if(res.data.success)
            {
                const updatedUserData={
                    ...user,
                    bio:res.data.user.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user?.gender,
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex max-w-2xl mx-auto pl-10">
            <section className="flex flex-col gap-6 w-full my-8">
                <h1 className="font-bold text-xl">Edit Profile</h1>
                <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">

                    <div className="flex items-center gap-3">
                        <Avatar >
                            <AvatarImage src={user?.profilePicture} alt="post_image" className='' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>


                        <div className="">
                            <h1 className="font-bold text-sm">{user?.username}</h1>
                            <span className="text-gray-600 ">{user?.bio || 'Bio here...'}</span>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChnageHandeler} type="file" className="hidden" />
                    <Button onClick={() => imageRef?.current.click()} className='bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Change Photo</Button>

                </div>
                <div>
                    <h1 className="font-bold text-xl mb-2">Bio</h1>
                    <Textarea value={input.bio} onChange={(e)=>setInput({...input,bio:e.target.value})} name='bio' className="focus-visible:ring-transparent" />
                </div>
                <div>
                    <h1 className="font-bold mb-2">Gender</h1>

                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end">
                    {
                        loading ? (
                            <Button className='w-fit bg-[#0095F6] h-8 hover:bg-[#318bc7]'>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait</Button>
                        ) :
                            <Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Submit</Button>
                    }

                </div>
            </section>
        </div>
    )
}

export default EditProfile;