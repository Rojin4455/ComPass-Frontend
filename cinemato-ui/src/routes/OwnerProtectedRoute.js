import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OwnerProtectedRoute({children}) {

    const access_token = useSelector((state) => state.user.access_token);
    const is_owner = useSelector((state) => state.user.is_owner);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!access_token){
        navigate("/owner/login/")
      }  },[])
      if (!is_owner) {
        navigate("/owner/login/")
      }
      if (access_token){
      return children
    }
}

export default OwnerProtectedRoute