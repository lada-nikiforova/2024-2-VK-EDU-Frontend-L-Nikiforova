"use strict"
import './index.css';
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const sendButton = document.querySelector('.send');
const containerChat = document.querySelector('.container-chat');
const answer = [
    "Привет! Может быть встретимся на днях?",
    "Мне удобнее вечером, давай в 18.00",
    "Отлично, до встречи!"
];
let index = 0;
window.addEventListener('load', () => {loadMessages();});
sendButton.addEventListener('click', handleSubmit);
form.addEventListener('submit',handleSubmit);
//localStorage.clear();
//form.addEventListener('keypress', this.handleKeyPress.bind(this));
function loadMessages(){
    const messages = [];
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const keyDate = new Date(key);
        const messageHTML = localStorage.getItem(key);
        if (!key.includes('loglevel') && messageHTML) {
                messages.push({ key, messageHTML });
        }
    }
    messages.sort((a, b) => new Date(a.key) - new Date(b.key));
    for (let i = 0; i < messages.length; i++) {
        containerChat.innerHTML += messages[i].messageHTML;
        
    }
    containerChat.scrollTop = containerChat.scrollHeight;
    
}

function answerPerson(){
    const containerElement = document.createElement('div');
    containerElement.classList.add('container-message-person');
    containerChat.appendChild(containerElement);
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img-icon');
    const imgElement = document.createElement('img');
    imgDiv.appendChild(imgElement)
    imgElement.src = 'https://img.freepik.com/premium-photo/confident-young-woman-with-curly-hair-in-casual-white-shirt-portrait-of-positivity-and-selfassura_1229340-2356.jpg';
    containerElement.appendChild(imgDiv);
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('message-person');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('message-p');
    const nameElement = document.createElement('div');
    nameElement.classList.add('name');
    nameElement.classList.add('name-p');
    const timeElement = document.createElement('div');
    timeElement.classList.add('time');
    timeElement.classList.add('time-p');
    nameElement.innerText = "Дарья Петрова";
    messageElement.innerHTML = answer[index];
    const time = new Date();
    timeElement.innerText = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ' ' + time.getDate().toString().padStart(2, '0') + '.'+ time.getMonth().toString().padStart(2, '0') + '.' + time.getFullYear().toString().padStart(2, '0');
    containerElement.appendChild(containerMessage);
    containerMessage.appendChild(nameElement);
    containerMessage.appendChild(messageElement);
    containerMessage.appendChild(timeElement);
    index = (index + 1) % answer.length;
    console.log(index);
    const keyTime = time.toISOString();
    localStorage.setItem(keyTime, containerElement.outerHTML);
    containerChat.scrollTop = containerChat.scrollHeight;
}


function handleSubmit (event) {
    event.preventDefault();
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
    timeElement.innerText = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ' ' + time.getDate().toString().padStart(2, '0') + '.'+ time.getMonth().toString().padStart(2, '0') + '.' + time.getFullYear().toString().padStart(2, '0');
    messageElement.innerText = messageText;
    input.value = ''; 
    containerMessage.appendChild(messageElement);
    containerMessage.appendChild(timeElement);
    const key = time;
    const messageData = [nameElement.value, timeElement.value, messageElement.value];
    const keyTime = time.toISOString();
    localStorage.setItem(keyTime, containerMessage.outerHTML);
    setTimeout(answerPerson, 500);
    containerChat.scrollTop = containerChat.scrollHeight;
    
    
}

// function handleKeyPress (event) {
//     if (event.keyCode === 13) {
//         form.dispatchEvent(new Event('submit'));
//     }
// }

