import { useState } from 'react';
import './App.css';
import PageChat from './pages/PageChat/index.jsx';
import PageChatList from './pages/PageChatList/index.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('chatList');

  const goToChatList = () => setCurrentPage('chatList');
  const goToChat = () => {setCurrentPage('chat')};

  return (
    <div>
      {currentPage === 'chat' && <PageChat onBack={goToChatList} />}
      {currentPage === 'chatList' && <PageChatList onBack={goToChat} />}
    </div>
  );
};

export default App;