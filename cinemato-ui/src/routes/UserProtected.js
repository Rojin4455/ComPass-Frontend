// import React, { useEffect } from "react";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import { GenerateNewToken } from "../axiosConfig";
// import { setUser } from "../slices/userSlice";

// const UserProtectedRoute = () => {
//   const navigate = useNavigate();
//   const RenewToken = GenerateNewToken();
//   const isTokenExpired = (token) => {
//     if (!token) return true;
    
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Math.floor(Date.now() / 1000);
      
//       console.log("no token",decodedToken.exp<currentTime)
//       return decodedToken.exp > currentTime;
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return true;
//     }
//   };

//   const access_token = useSelector((state) => state.user.access_token);

//   useEffect(() => {
//     if (access_token) {
//       if (isTokenExpired(access_token)) {
//         console.log("Token is Expired");
  
//         const handleRenewToken = async () => {
//           try {
//             const response = await RenewToken.post("renew-token/");
//             if (response.status === 200) {
//               setUser({ access_token: response.data.access });
//               console.log("new token is reached");
//               return <Outlet />;
//             } else {
//               navigate("/");
//             }
//           } catch (error) {
//             console.error("Error renewing token:", error);
//             navigate("/");
//           }
//         };
  
//         handleRenewToken();
//       } else {
//         console.log("token is valid");
//         navigate("/profile");
//       }
//     } else {
//       console.log("No Token in user state");
//       navigate("/");
//     }
//   },[])
  
// };

// export default UserProtectedRoute;



import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { GenerateNewToken } from "../axiosConfig";
import { setUser } from "../slices/userSlice";



const UserProtectedRoute = ({children}) => {

  const access_token = useSelector((state) => state.user.access_token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token){
      navigate("/")
    }  },[])
    if (access_token){
      console.log("access token is there")
    return children
  }
}


export default UserProtectedRoute;
