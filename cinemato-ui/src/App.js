import React, { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminRoutes from './routes/AdminRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import './toastStyles.css';
import ToastNotifier from './utils/ToastNotifier';
import { Toaster } from 'sonner';
import placesContext from './context/placesContext';



function App() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID;

  console.log(apiUrl)


  const showWarningToast = () => {
    ToastNotifier("warning","Number of tiers not exceed 5")
  };
  return (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
    <Toaster position="top-center" richColors />  {/* This will enable toast notifications */}
      <UserRoutes/>
      <AdminRoutes/>
      <OwnerRoutes/>
    </Router>
  </GoogleOAuthProvider>


  )
}

export default App
