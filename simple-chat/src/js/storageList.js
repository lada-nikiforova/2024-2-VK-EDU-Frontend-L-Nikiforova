import '../index.css';
function load() {
    const chatList = document.querySelector('.list');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('chat_')&&key.endsWith('_Button')) {
            console.log(key);
            const chatData = localStorage.getItem(key);
            const button = document.createElement('button');
            button.classList.add('container-button-chat');
            button.id = key;
            button.innerHTML = chatData;
            chatList.appendChild(button);
            console.log(button);
            const chatId = key.replace('_Button', '');
            const lastMessageData = getLastMessage(chatId);
            console.log(chatId);
            const messageElement = button.querySelector('.chat-message');
            const timeElement = button.querySelector('.chat-time')
            console.log(lastMessageData);
            if (lastMessageData) {
                messageElement.innerHTML = lastMessageData.message;
                timeElement.innerHTML = lastMessageData.time;
            }
        }
    }
}
function getLastMessage(chatId) {
    const chatMessagesHTML = localStorage.getItem(chatId);
    if (!chatMessagesHTML) {
        return null;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = chatMessagesHTML;
    const messageContainers = tempDiv.querySelectorAll('.container-message, .container-message-person');
    if (messageContainers.length === 0) {
        return null;
    }
    const lastMessageContainer = messageContainers[messageContainers.length - 1];
    const messageElement = lastMessageContainer.querySelector('.message');
    const timeElement = lastMessageContainer.querySelector('.time');
    return {
        message: messageElement.textContent,
        time: timeElement.textContent,
    };
}

window.addEventListener('DOMContentLoaded', () => load());