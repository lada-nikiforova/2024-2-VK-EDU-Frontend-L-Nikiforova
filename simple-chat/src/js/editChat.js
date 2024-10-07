// import { displayLastMessage } from "./lastMessage";

 function editChat(){
    const chatList = document.querySelector('.chat-list');
    const button = document.createElement('button');
    button.classList.add('container-button-chat');
    const lastChatId = chatList.lastElementChild.id;
    let numberId = lastChatId.match(/\d+/);
    let currentNumber = parseInt(numberId[0], 10);  
    let nextNumber = currentNumber + 1;
    let newId = lastChatId.replace(currentNumber, nextNumber);
    console.log(newId);
    button.id = newId;
    chatList.appendChild(button);
    
    displayLastMessage(`chat${nextNumber}`, document.getElementById(newId));
    let newChat = button.innerHTML;
    localStorage.setItem(newId, newChat);
}
    