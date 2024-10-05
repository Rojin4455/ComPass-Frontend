import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminRoutes from './routes/AdminRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID;

  console.log(apiUrl)


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });
  
  return (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
      <UserRoutes/>
      <AdminRoutes/>
      <OwnerRoutes/>
    </Router>
  </GoogleOAuthProvider>
    
  )
}

export default App
