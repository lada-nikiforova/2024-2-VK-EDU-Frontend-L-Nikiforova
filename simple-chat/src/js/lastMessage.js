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

export function displayLastMessage(chatId, chatPreviewElement) {
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