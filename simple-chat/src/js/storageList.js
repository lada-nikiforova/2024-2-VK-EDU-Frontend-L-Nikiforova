import '../index.css';
function load() {
    const chatList = document.querySelector('.chat-list');
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