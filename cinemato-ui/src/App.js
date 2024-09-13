import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID;

  console.log(apiUrl)
  
  return (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
      <UserRoutes/>
      <AdminRoutes/>
    </Router>
  </GoogleOAuthProvider>
    
  )
}

export default App
