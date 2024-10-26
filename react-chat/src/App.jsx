import { useState } from 'react';
import './App.css';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';
import PageProfile from './pages/PageProfile/index.jsx';
import { HashRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/:id' Component={PageChat}/>
        <Route path='/' Component={PageChatList}/>
        <Route path='/profile' Component={PageProfile}/>
      </Routes>
    </HashRouter>
  );
};

export default App;