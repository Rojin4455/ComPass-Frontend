import React,{useEffect} from "react";
import {Navigate,Outlet,replace,useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";


const AdminProtectedRoute = () => {
  const user = useSelector((state) => state.user);
  const access_token = user?.access_token;  // Get access_token from user state
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
  };

  useEffect(() => {
    if (!access_token) {
      console.log("No Token in user state");
      navigate("/admin");  // Redirect to login or admin page if no token
    } else if (isTokenExpired(access_token)) {
      console.log("Token is Expired");
      navigate("/");  // Redirect to homepage or login if token is expired
    }
  }, [access_token, navigate]);

  // If token is valid, render the Outlet for the protected routes
  return access_token && !isTokenExpired(access_token) ? <Outlet /> : null;
};

export default AdminProtectedRoute;


