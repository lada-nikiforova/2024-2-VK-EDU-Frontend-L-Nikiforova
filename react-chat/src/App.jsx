import './App.css';
import PageAuth from './pages/PageAuth';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';
import PageProfile from './pages/PageProfile/index.jsx';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageRegister from './pages/PageRegister';
import apiClient from './api/apiClient';
import {jwtDecode} from 'jwt-decode';
import Loader from './components/Loader/Loader';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const checkTokenValidity = () => {
    setIsChecking(true);
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        // console.log(decoded);
        console.log('Cur: ', currentTime);
        if (decoded.exp - currentTime <= 300) {
          refreshAuthToken();
          console.log("REF");
        } else if (decoded.exp > currentTime) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setIsChecking(false);
          setIsAuthenticated(true);
          // console.log('3', isAuthenticated)
          return;
        }
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
    else{
      setIsAuthenticated(false);
      // console.log('2', isAuthenticated)
    }
    setIsChecking(false);
    
  };

  const refreshAuthToken = async () => {
    try {
      const response = await apiClient.post('/auth/refresh/');
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setIsAuthenticated(true);
      console.log('REFRESHED TOKEN')
    } catch (err) {
      console.error('Failed to refresh token', err);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkTokenValidity();
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 60000); 

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    console.log('isAuthenticated changed:', isAuthenticated);
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  const onLogout = ()=>{
    setIsAuthenticated(false);
  }
  const AuthSwitch = () => {
    if (isChecking) {
      return <Loader />;
    }

    return isAuthenticated ? (
      <Routes>
        <Route path="/chat/:id" element={<PageChat />} />
        <Route path="/" element={<PageChatList onLogout={onLogout} />} />
        <Route path="/profile" element={<PageProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/auth" element={<PageAuth onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  };

  return (
    <HashRouter>
      <AuthSwitch />
    </HashRouter>
  );
};

//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/auth" element={<PublicRoutes> <PageAuth onAuthSuccess={handleAuthSuccess} /></PublicRoutes>} />
//         <Route path="/register" element={<PublicRoutes> <PageRegister /> </PublicRoutes>} />
//         <Route element={<ProtectedRoutes />}>
//           <Route path="/chat/:id" element={<PageChat />} />
//           <Route path="/" element={<PageChatList />} />
//           <Route path="/profile" element={<PageProfile />} />
//         </Route>
//       </Routes>
//     </HashRouter>
//   );
// };

export default App;