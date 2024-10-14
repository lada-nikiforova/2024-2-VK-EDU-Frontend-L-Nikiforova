

document.querySelector('.list').addEventListener('click', function (event) {
    
    if (event.target.closest('.container-button-chat')) {
        const button = event.target.closest('.container-button-chat');
        const chatId = button.id.replace('_Button', ''); 
        const name = button.querySelector('.chat-name').innerText;
        console.log(name);
        localStorage.setItem('activePerson', name);
        window.history.pushState({}, '', `?chat_id=${chatId}`);
        localStorage.setItem('activeChatId', chatId);
        window.location.href = 'index.html';
    }
});