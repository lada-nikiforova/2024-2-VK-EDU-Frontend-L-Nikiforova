// import {answerPerson} from './userAnswer.js';
const input = document.querySelector('.form-input');
 function handleSubmit (event) {
    event.preventDefault();
    const activeChat = localStorage.getItem('activeChat');
    const containerChat = document.getElementById(`${activeChat}-container`);
    // const chatId = document.getElementById(chatId);
    console.log(containerChat);
    const messageText = input.value; 
    if (messageText === '') return;
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('container-message');
    containerChat.appendChild(containerMessage);
    const nameElement = document.createElement('div');
    nameElement.classList.add('name');
    nameElement.innerText = 'Мария Иванова';
    containerMessage.appendChild(nameElement);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const timeElement = document.createElement('div');
    timeElement.classList.add('time');
    const time = new Date();
    timeElement.innerText = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
    messageElement.innerText = messageText;
    input.value = ''; 
    containerMessage.appendChild(messageElement);
    containerMessage.appendChild(timeElement);

   
    setTimeout(answerPerson(activeChat, `${activeChat}-container`), 1200);
    let data = localStorage.getItem(activeChat);
    data = data ? data : '';

    let newMessage = containerChat.innerHTML;
    console.log(newMessage);

    localStorage.setItem(activeChat, newMessage);
    containerChat.scrollTop = containerChat.scrollHeight;
}