"use strict"
import './index.css';

const form = document.querySelector('form');
const sendButton = document.querySelector('.send');
const chatButton = document.querySelector('.list-button');
chatButton.addEventListener('click', function(){window.location.href = 'pages.html';});

sendButton.addEventListener('click',(event)=>handleSubmit(event));
form.addEventListener('submit', (event)=>handleSubmit(event));

const input = document.querySelector('.form-input');
function handleSubmit (event) {
    event.preventDefault();
    const activeChat = localStorage.getItem('activeChatId');
    console.log(activeChat);

    const containerChat = document.querySelector('.container-chat');

    console.log(containerChat);
    const messageText = input.value; 
    if (messageText === '') return;
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('container-message');

    const time = new Date();
    const timeElement = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
    const messageElement = messageText;
    input.value = ''; 
    containerMessage.innerHTML = `  <div class="name">Вы</div>
                                    <div class="message">${messageElement}</div>
                                    <div class="time">${timeElement}</div>`;
    console.log(containerMessage);
    containerChat.appendChild(containerMessage);
    setTimeout(answerPerson(), 1200);
    let data = localStorage.getItem(activeChat);
    data = data ? data : '';
    let newMessage = containerChat.innerHTML;
    console.log(newMessage);
    localStorage.setItem(activeChat, newMessage);
    containerChat.scrollTop = containerChat.scrollHeight;
}

function answerPerson(){
    const containerChat = document.querySelector('.container-chat');
    const time = new Date();
    const timeElement = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
    const namePerson = localStorage.getItem('activePerson');
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('container-message-person');
    containerMessage.innerHTML = `  <div class="img-container"><img class="img-icon" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?"></div>
                                    <div class="message-person">
                                        <div class="name name-p">${namePerson}</div>
                                        <div class="message message-p">Сообщение собеседника</div>
                                        <div class="time time-p">${timeElement}</div>
                                        </div>`;
    
    containerChat.appendChild(containerMessage);
    containerChat.scrollTop = containerChat.scrollHeight;
}




