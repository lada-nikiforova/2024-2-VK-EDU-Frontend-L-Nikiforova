import React, {useEffect, useRef} from 'react';
import './ContainerChat.scss';

const ContainerChat = ({message}) => {
    const bottomRef = useRef();
    useEffect(() => {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;   
      }, [message]);
    
    return (
        <div ref={bottomRef} className="container-chat"> 
                {message.map(mes=>(
                <React.Fragment key={mes.id}>
                <div key={mes.id} className='container-message'>
                    <div className="name">Вы</div>
                    <div className="message">{mes.message}</div>
                    <div className="time">{mes.time}</div>
                </div>  
                    <div className='container-message-person'>
                    <div className="img-container"><img className="img-icon" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?"/></div>
                    <div className="message-person">
                        <div className="name name-p">{mes.name_a}</div>
                        <div className="message message-p">{mes.message_a}</div>
                        <div className="time time-p">{mes.time_a}</div>
                    </div>
                </div>
                </React.Fragment>
                ))}
            
        </div>
    );
}

export default ContainerChat;

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
