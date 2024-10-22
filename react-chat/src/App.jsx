import { useState, useEffect } from 'react';
import './App.css';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';
import {currentPage} from './constant.js';

const App = () => {
  
  const [page, setPage] = useState(() => localStorage.getItem(currentPage) || 'chatList');

  const goToChatList = () => {setPage('chatList'); localStorage.setItem(currentPage, 'chatList');};
  const goToChat = () => {setPage('chat'); localStorage.setItem(currentPage, 'chat');};

  useEffect(() => {
    const savedPage = localStorage.getItem(currentPage);
    setPage(savedPage);
  }, []);

  return (
    <div>
      {page === 'chat' && <PageChat onBack={goToChatList} />}
      {page === 'chatList' && <PageChatList onBack={goToChat} />}
    </div>
  );
};

export default App;