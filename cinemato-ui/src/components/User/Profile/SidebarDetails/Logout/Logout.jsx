import React, { useEffect } from 'react';
import useAxiosInstance from '../../../../../axiosConfig';
import axios from 'axios';
import { MdRepeatOn } from 'react-icons/md';
import { clearUser } from '../../../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setContent} from '../../../../../slices/userProfileSlice'
import { persistor } from '../../../../../store/store';
import { store } from '../../../../../store/store';

function Logout() {
    const axiosInstance = useAxiosInstance();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        const handleLogout = async () => {
            try{
                const response = await axiosInstance.post("user/logout/")
                
                if(response.status === 200) {
                    
                    dispatch(clearUser())
                    console.log("State after clearUser:", store.getState());
                    localStorage.removeItem('persist:root');
                    await persistor.purge()
                    // dispatch(setContent('personalDetails'))
                    console.log("logout successfully : ",response)
                    dispatch(setContent({ content: 'personalDetails' }))
                    navigate('/')
                }else{
                    console.log("something went wrong",response)
                }
            }catch(error){
                console.log("error happens: ",error);
                
            }
        }
        handleLogout();
        

    },[])


    return (
        <div>
            <h2>Logout</h2>
            <p>You have been logged out.</p>
        </div>
    );
}

export default Logout;
