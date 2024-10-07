

const answer = "Сообщение собеседника";


function answerPerson(chatId, containerId){
    const containerChat = document.getElementById(containerId);

    const containerElement = document.createElement('div');
    containerElement.classList.add('container-message-person');
    containerChat.appendChild(containerElement);
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img-container');
    const imgElement = document.createElement('img');
    imgElement.classList.add('img-icon');
    imgDiv.appendChild(imgElement);
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
    
    if (chatId === 'chat1'){
        imgElement.src = 'https://img.freepik.com/premium-photo/confident-young-woman-with-curly-hair-in-casual-white-shirt-portrait-of-positivity-and-selfassura_1229340-2356.jpg';
        nameElement.innerText = "Дарья Петрова";
    }
    else{
        imgElement.src = 'https://img.freepik.com/free-photo/front-view-smiley-man-outdoors-city_23-2148955558.jpg';
        nameElement.innerText = "Иван Иванов";
    }
    
    
    messageElement.innerHTML = answer;
    const time = new Date();
    timeElement.innerText = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
    containerElement.appendChild(containerMessage);
    containerMessage.appendChild(nameElement);
    containerMessage.appendChild(messageElement);
    containerMessage.appendChild(timeElement);

    containerChat.scrollTop = containerChat.scrollHeight;
}