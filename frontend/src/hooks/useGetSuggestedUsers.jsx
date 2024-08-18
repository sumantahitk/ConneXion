import { setSuggestedUser } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetSuggestedUsers=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{

        const fetchSuggestedUsers =async ()=>{
            try{
                const res=await axios.get('https://connexion-67zf.onrender.com/api/v1/user/suggested',
                    {
                        withCredentials:true
                    });
                    if(res.data.success){
                        console.log(res.data.posts);
                        dispatch(setSuggestedUser(res.data.users));
                    }
            }catch(error)
            {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    },[])
};
export default useGetSuggestedUsers;