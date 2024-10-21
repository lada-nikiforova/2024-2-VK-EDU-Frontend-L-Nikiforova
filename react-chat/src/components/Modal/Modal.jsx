import {useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';



const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [namePerson, setNamePerson] = useState(''); 
     
    const createChat = (event) => {
        if (namePerson === ''){
            return(
                <p>Введите собеседника</p>
            )
        }
        event.preventDefault(); 
        localStorage.setItem('activePerson', namePerson);
        const chatId = 'chat_' + Math.random().toString(36).substring(2, 9) + '_Button';
        const newChat = {
            id: chatId,
            name: namePerson,
        };
        onAddChat(newChat);
        setNamePerson('');
    };

    
    return (
        <>
            <div className={`modal ${isOpen ? '' : 'hidden'}`} >
                <div className='container-close'><button className="icon-button" onClick={onClose}>
                    <CloseIcon sx={{ fontSize: 40 }} className="icon close-icon" />
                </button></div>
                
                <form className="form-container" action="/" onSubmit={createChat}>
                    <p>С кем вы хотите создать чат?</p>
                    <input className="form-text" name="text" placeholder="Введите имя собеседника" type="text" value={namePerson} onChange={(e) => setNamePerson(e.target.value)} required/>
                </form>
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={onClose}></div>
        </>
    );
}

export default Modal;