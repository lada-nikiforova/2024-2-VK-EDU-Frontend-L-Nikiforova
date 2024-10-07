import '../index.css';
function load() {
    const activePage = localStorage.getItem('activePage');
    const chatList = document.querySelector('.chat-list');
    const pageList = document.querySelector('.page-list');
    const pageChat = document.querySelector('.page-chat');
    const activeChat = localStorage.getItem('activeChat');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('chat') && key.endsWith('Button')) {
            console.log(key);
            const chatData = localStorage.getItem(key);
            const button = document.createElement('button');
            button.classList.add('container-button-chat');
            button.id = key;
            button.innerHTML = chatData;
            chatList.appendChild(button);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => load());