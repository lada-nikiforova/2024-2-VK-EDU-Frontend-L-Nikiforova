import {useState, useEffect} from 'react';
import './InputForm.scss';
import  SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {activeChatId, activePerson} from '../../constant';
import { saveMessage } from '../../api/apiMessage';

const InputForm = ({onAddMessage}) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState(''); 
    const [error, setError] = useState(false);
    const chatData = localStorage.getItem(activePerson);
    const chatId = localStorage.getItem(activeChatId);
    const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

    const toggleAttachmentMenu = () => {
        setAttachmentMenuOpen((prev) => !prev);
    };

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
    const handleAttachmentClick = (type) => {
        console.log(`Выбрано: ${type}`);
        setAttachmentMenuOpen(false);
    };
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Геолокация не поддерживается.");
        }
      }
    
    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log( `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        const newMessage = {
            text: `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
            chat: chatId, 
        };
        onAddMessage(newMessage);
    }


    return (
        <div className="lower">
                <div className="attachment-wrapper">
                    <button className="icon-button" onClick={toggleAttachmentMenu}>
                        <AttachFileIcon sx={{ fontSize: 40 }} className="icon" />
                    </button>
                    {isAttachmentMenuOpen && (
                        <div className="attachment-menu">
                            <button onClick={getLocation}>Геопозиция</button>
                            <button onClick={() => handleAttachmentClick('photo')}>Фото</button>
                        </div>
                    )}
                </div>
                <form className="form" action="/" onSubmit={createMessage}>
                    <input className={`form-input ${error ? 'error' : ''}`} name="message-text" placeholder={error ? "Введите корректное сообщение..." : "Введите сообщение..."} type="text" value={message} onChange={(e) => setMessage(e.target.value)} required autoComplete="off"/>
                </form>
            <button className="send icon-button"><SendIcon sx={{ fontSize: 40 }} className="icon" onClick={createMessage} /></button> 
        </div>
    );
}

export default InputForm;