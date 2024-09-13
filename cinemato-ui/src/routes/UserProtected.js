import React from "react";
import {Navigate,Outlet,useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";


const UserProtectedRoute = () => {
    const user = useSelector((state) => state.user)
    console.log("current user in profile: ",user)
    const navigate = useNavigate();
    const isTokenExpired = (token) => {
        if (!token) return true; // No token means it's "expired" or invalid
      
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      
          // Check if the token is expired
          return decodedToken.exp < currentTime;
        } catch (error) {
          console.error("Invalid token:", error);
          return true; // Consider invalid tokens as expired
        }
      }
    
    const access_token = useSelector((state) => state.user.access_token)
    if (access_token) {
        if (isTokenExpired(access_token)) {
            console.log("Token is Expired")
            navigate("/")
        }else{
            console.log("token is valid");
            return <Outlet/>;
        }

    }else{
        console.log("No Token in user state");
        navigate("/")
    }
}


export default UserProtectedRoute;

