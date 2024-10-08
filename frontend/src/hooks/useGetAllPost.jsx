import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllPost=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{

        const fetchAllPost =async ()=>{
            try{
                const res=await axios.get('https://connexion-67zf.onrender.com/api/v1/post/allpost',
                    {
                        withCredentials:true
                    });
                    if(res.data.success){
                        console.log(res.data.posts);
                        dispatch(setPosts(res.data.posts));
                    }
            }catch(error)
            {
                console.log(error);
            }
        }
        fetchAllPost();
    },[])
};
export default useGetAllPost;