import '../index.css';

function openChat(chatId) {
    const chatData = localStorage.getItem('activePerson');
    const chatContainer = document.querySelector('.container-chat');
    const savedMessages = localStorage.getItem(chatId);
    if (savedMessages) {
        chatContainer.innerHTML = savedMessages;
    }

    const chat = document.querySelector('.chat');

    const headerDiv = document.querySelector('.main_header');
    headerDiv.insertAdjacentHTML( 'beforeend', `
        <div class="img-container"><img src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"></div>
        <div class = "text-header"> <p class="person-name">${chatData}</p>
        <p class = "status">Онлайн</p> </div>
        `);
    // headerDiv.append(headerDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    
    
}


document.addEventListener('DOMContentLoaded', function() {
    const chatId = localStorage.getItem('activeChatId');
    window.history.pushState({}, '', `?chat_id=${chatId}`);
    console.log(chatId);
    if (chatId) {
        openChat(chatId);
    }
});


