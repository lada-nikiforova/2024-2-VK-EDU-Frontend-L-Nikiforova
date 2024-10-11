"use strict"
import './index.css';

const form = document.querySelector('form');
const sendButton = document.querySelector('.send');
const chatButton = document.getElementById('list-button');

const chatListPage = document.getElementById('chat-list');
const chatPage = document.getElementById('chat-page');
const chat = document.querySelector('.chat');
chatButton.addEventListener('click', function(){window.location.href = 'pages.html';});

sendButton.addEventListener('click',(event)=>handleSubmit(event));
form.addEventListener('submit', (event)=>handleSubmit(event));

const input = document.querySelector('.form-input');
function handleSubmit (event) {
    event.preventDefault();
    const activeChat = localStorage.getItem('activeChatId');
    console.log(activeChat);
    // const containerChat = document.getElementById(`${activeChat}-container`);
    const containerChat = document.querySelector('.container-chat');
    // containerChat.classList.add('container-chat');
    // chat.appendChild(containerChat);
    console.log(containerChat);
    const messageText = input.value; 
    if (messageText === '') return;
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('container-message');
    // containerChat.appendChild(containerMessage);
    const time = new Date();
    const timeElement = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
    const messageElement = messageText;
    input.value = ''; 
    containerMessage.innerHTML = `  <div class="name">Вы</div>
                                    <div class="message">${messageElement}</div>
                                    <div class="time">${timeElement}</div>`;
    console.log(containerMessage);
    containerChat.appendChild(containerMessage);
    // const nameElement = document.createElement('div');
    // nameElement.classList.add('name');
    // nameElement.innerText = 'Мария Иванова';
    // containerMessage.appendChild(nameElement);
    // const messageElement = document.createElement('div');
    // messageElement.classList.add('message');
    // const timeElement = document.createElement('div');
    // timeElement.classList.add('time');
    
    
    // containerMessage.appendChild(messageElement);
    // containerMessage.appendChild(timeElement);
    setTimeout(answerPerson(), 1200);
    let data = localStorage.getItem(activeChat);
    data = data ? data : '';
    let newMessage = containerChat.innerHTML;
    console.log(newMessage);
    localStorage.setItem(activeChat, newMessage);
    containerChat.scrollTop = containerChat.scrollHeight;
}

const answer = "Сообщение собеседника";


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
    
    // const containerElement = document.createElement('div');
    // containerElement.classList.add('container-message-person');
    // containerChat.appendChild(containerElement);
    // const imgDiv = document.createElement('div');
    // imgDiv.classList.add('img-container');
    // const imgElement = document.createElement('img');
    // imgElement.classList.add('img-icon');
    // imgDiv.appendChild(imgElement);
    // containerElement.appendChild(imgDiv);
    
    // const messageElement = document.createElement('div');
    // messageElement.classList.add('message');
    // messageElement.classList.add('message-p');
    // const nameElement = document.createElement('div');
    // nameElement.classList.add('name');
    // nameElement.classList.add('name-p');
    // const timeElement = document.createElement('div');
    // timeElement.classList.add('time');
    // timeElement.classList.add('time-p');
    // if (chatId === 'chat1'){
    //     imgElement.src = 'https://img.freepik.com/premium-photo/confident-young-woman-with-curly-hair-in-casual-white-shirt-portrait-of-positivity-and-selfassura_1229340-2356.jpg';
    //     nameElement.innerText = "Дарья Петрова";
    // }
    // else{
    //     imgElement.src = 'https://img.freepik.com/free-photo/front-view-smiley-man-outdoors-city_23-2148955558.jpg';
    //     nameElement.innerText = "Иван Иванов";
    // }
    // messageElement.innerHTML = answer;
   
    // containerElement.appendChild(containerMessage);
    // containerMessage.appendChild(nameElement);
    // containerMessage.appendChild(messageElement);
    // containerMessage.appendChild(timeElement);
    containerChat.scrollTop = containerChat.scrollHeight;
}




