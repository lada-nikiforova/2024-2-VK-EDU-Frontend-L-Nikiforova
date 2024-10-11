import '../index.css';



function generateChatId() {
    return 'chat_' + Math.random().toString(36).substring(2, 9);
}

function editChat(){
    const chatId = generateChatId();
    const namePerson = localStorage.getItem('activePerson');
    const time = new Date();
    const newChat = {
        name: namePerson,
        messages: [],
        lastMessage: "Сообщение отсутствует",
        lastTime: time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0'),
    };

    localStorage.setItem(chatId, JSON.stringify(newChat));
    const chatList = document.querySelector('.list');
    const chatButton = document.createElement('button');
    chatButton.classList.add('container-button-chat');
    chatButton.id = `${chatId}_Button`;
    chatButton.innerHTML = `
        <div class="container-img"><img class="chat-img" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"></div>
        <div class="chat-info">
            <div class="chat-name">${newChat.name}</div>
            <div class="chat-message">${newChat.lastMessage}</div>
        </div>
        <div class="chat-time">${newChat.lastTime}</div>`;
    chatList.appendChild(chatButton);
    localStorage.setItem(`${chatId}_Button`, chatButton.innerHTML);

    
}
    
document.querySelector('.edit-button').addEventListener('click', function(){modal.classList.remove('hidden');overlay.classList.remove('hidden');});
const modal = document.querySelector('.modal');
const closemodal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const buttonCreateChat = document.querySelector('.button-create-chat');
const input = document.querySelector('.form-text');
function createChat(event){
    event.preventDefault();
    const namePerson = input.value;
    console.log(namePerson);
    localStorage.setItem('activePerson', namePerson);
    editChat();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
form.addEventListener('submit', (event)=>createChat(event));
buttonCreateChat.addEventListener('click', (event)=>createChat(event));
closemodal.addEventListener('click', function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
})

overlay.addEventListener('click', function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
})