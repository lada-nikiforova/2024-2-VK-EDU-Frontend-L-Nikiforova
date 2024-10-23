import {useState, useEffect} from 'react';
import './InputForm.scss';
import  SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import {activePerson} from '../../constant';

const InputForm = ({onAddMessage}) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState(''); 
    const [error, setError] = useState(false);
    useEffect(()=>{
        const chatData = localStorage.getItem(activePerson);
        setName(chatData);
    }, []);
    
    const createMessage = (event) => {
        event.preventDefault(); 
        if(message.trim().length){
            const time = new Date();
            const timeElement = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
            
            const newMessage = {
                id: time,
                message: message,
                time: timeElement,
                
            };
            
            onAddMessage(newMessage);
            setTimeout(() => {
                const newAnswer = {
                    name_a: name,
                    message_a: 'Ответ', 
                    time_a: new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0')
                };
                
                // Обновляем объект сообщения, добавляя ответ
                onAddMessage({ ...newMessage,  ...newAnswer });
            }, 1200);
            setMessage('');
            setError(false);

        }
        else{
            setError(true);
            setMessage('');
        }
    };


    return (
        <div className="lower">
                <button className="icon-button"> <SentimentSatisfiedIcon sx={{ fontSize: 40 }} className="icon"/></button>
                <form className="form" action="/" onSubmit={createMessage}>
                    <input className={`form-input ${error ? 'error' : ''}`} name="message-text" placeholder={error ? "Введите корректное сообщение..." : "Введите сообщение..."} type="text" value={message} onChange={(e) => setMessage(e.target.value)} required autoComplete="off"/>
                </form>
            <button className="send icon-button"><SendIcon sx={{ fontSize: 40 }} className="icon" onClick={createMessage} /></button> 
        </div>
    );
}

export default InputForm;