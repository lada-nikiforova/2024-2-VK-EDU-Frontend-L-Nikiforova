import { useState } from 'react';
import './App.css';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';
import {currentPage} from './constant.js';

const App = () => {
  const [page, setPage] = useState(() => {const savedPage = localStorage.getItem(currentPage); return savedPage!== null ? savedPage : 'chatList'; });
  const goToChatList = () => {setPage('chatList'); localStorage.setItem(currentPage, 'chatList');};
  const goToChat = () => {setPage('chat'); localStorage.setItem(currentPage, 'chat');};
  return (
    <div>
      {page === 'chat' && <PageChat onBack={goToChatList} />}
      {page === 'chatList' && <PageChatList onBack={goToChat} />}
    </div>
  );
};

export default App;