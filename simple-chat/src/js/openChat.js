import '../index.css';
const headers = {
    chat1: {
        data: [{
            src: "https://img.freepik.com/premium-photo/confident-young-woman-with-curly-hair-in-casual-white-shirt-portrait-of-positivity-and-selfassura_1229340-2356.jpg",
            name: "Даша Петрова"
        }]
        
    },
    chat2: {
        data: [{
            src: "https://img.freepik.com/free-photo/front-view-smiley-man-outdoors-city_23-2148955558.jpg",
            name: "Иван Иванов"
        }]
        
    }
};
let currentChatId = null;
let currentContainerId = null;
const chatListPage = document.getElementById('chat-list');
const chatPage = document.getElementById('chat-page');
function openChatPage() {
    document.getElementById('chat1-container').classList.remove('active');
    document.getElementById('chat2-container').classList.remove('active');
    

    currentChatId = localStorage.getItem('activeChat'); 
    currentContainerId = `${currentChatId}-container`;
    const selectedChat = headers[currentChatId];
    selectedChat.data.forEach((header) => {
        const headerDiv = `
            <div class="img-container"><img src="${header.src}" alt=""> </div>
            <p><span class="person-name">${header.name}</span> <br>Онлайн </p> 
        `;
        document.querySelector('.main_header').insertAdjacentHTML('beforeend', headerDiv);
    });
    const savedMessages = localStorage.getItem(currentChatId);
    const chatContainer = document.getElementById(currentContainerId);
    if (savedMessages) {
        chatContainer.innerHTML = savedMessages;
    }
    document.getElementById(currentContainerId).classList.add('active');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.addEventListener('DOMContentLoaded', () => openChatPage());
