import {useState, useEffect} from 'react';
import './InputForm.scss';
import  SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import {activeChatId, activePerson} from '../../constant';
import { saveMessage } from '../../api/apiMessage';

const InputForm = ({onAddMessage}) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState(''); 
    const [error, setError] = useState(false);
    const chatData = localStorage.getItem(activePerson);
    const chatId = localStorage.getItem(activeChatId);

    const createMessage = async(event) => {
        event.preventDefault(); 
        if(message.trim().length){
            const newMessage = {
                text: message,
                chat: chatId, 
            };
            // const savedMessage = await saveMessage(newMessage);
            // console.log(savedMessage);
            onAddMessage(newMessage);
            
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