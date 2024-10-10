import '../index.css';
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
    const nameElement = lastMessageContainer.querySelector('.name');
    const messageElement = lastMessageContainer.querySelector('.message');
    const timeElement = lastMessageContainer.querySelector('.time');
    const imgElement = lastMessageContainer.querySelector('.img-icon');
    return {
        name: nameElement.textContent,
        message: messageElement.textContent,
        time: timeElement.textContent,
        img: imgElement.src
    };
}

function displayLastMessage(chatId, chatPreviewElement) {
    const lastMessageData = getLastMessage(chatId);
    const container = document.createElement('div');
    const name = document.createElement('div');
    const message = document.createElement('div');
    const time = document.createElement('div');
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('container-img');
    const img = document.createElement('img');
    img.classList.add('chat-img')
    imgDiv.appendChild(img);
    container.classList.add('chat-info');
    name.classList.add('chat-name');
    message.classList.add('chat-message');
    time.classList.add('chat-time');
    if (lastMessageData) {
        name.innerHTML = lastMessageData.name;
        message.innerHTML = lastMessageData.message;
        time.innerHTML = lastMessageData.time;
        img.src = lastMessageData.img;
    } else {
        name.innerHTML = 'Неизвестный собеседник';
        message.innerHTML = 'Нет сообщений';
        time.innerHTML = '';
        img.src = 'https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?';
    }
    chatPreviewElement.appendChild(imgDiv);
    container.appendChild(name);
    container.appendChild(message);
    chatPreviewElement.appendChild(container);
    chatPreviewElement.appendChild(time);
    
}

function editChat(){
    const chatList = document.querySelector('.chat-list');
    const button = document.createElement('button');
    button.classList.add('container-button-chat');
    const keys = Object.keys(localStorage);
    const chatKeys = keys.filter(key => key.startsWith('chat')&& key.endsWith('Button'));
    if (chatKeys.length === 0) {
        console.log(chatKeys);
        button.id = 'chat3Button';
        chatList.appendChild(button); 
        displayLastMessage(`chat3`, document.getElementById('chat3Button'));
        let newChat = button.innerHTML;
        localStorage.setItem('chat3Button', newChat) ;
        return;
    }
    const maxChatId = chatKeys
        .map(key => parseInt(key.match(/\d+/)[0], 10)) 
        .reduce((max, num) => Math.max(max, num), 0);  
    let nextNumber = maxChatId + 1;
    button.id = `chat${nextNumber}Button`;
    chatList.appendChild(button);  
    displayLastMessage(`chat${nextNumber}`, document.getElementById(`chat${nextNumber}Button`));
    let newChat = button.innerHTML;
    localStorage.setItem(`chat${nextNumber}Button`, newChat);
}
    
document.querySelector('.edit-button').addEventListener('click', () =>  editChat());

displayLastMessage('chat1', document.getElementById('chat1Button'));
displayLastMessage('chat2', document.getElementById('chat2Button'));