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