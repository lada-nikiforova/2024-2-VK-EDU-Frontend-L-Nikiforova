import './App.css';
import PageAuth from './pages/PageAuth';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';
import PageProfile from './pages/PageProfile/index.jsx';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';
import PageRegister from './pages/PageRegister';
import apiClient from './api/apiClient';
import { Provider } from 'react-redux';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoutes = () => {
    if (isLoading) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<PageAuth onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/register" element={<PageRegister/>} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/chat/:id" element={<PageChat />} />
          <Route path="/" element={<PageChatList />} />
          <Route path="/profile" element={<PageProfile />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;