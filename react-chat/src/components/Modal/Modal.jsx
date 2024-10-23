import {useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import {activePerson} from '../../constant';


const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [namePerson, setNamePerson] = useState(''); 
    const [error, setError] = useState(false);
     
    const createChat = (event) => {
        event.preventDefault(); 
        if (namePerson.trim().length){
            localStorage.setItem(activePerson, namePerson.trim());
            const chatId = 'chat_' + Math.random().toString(36).substring(2, 9) + '_Button';
            const newChat = {
                id: chatId,
                name: namePerson.trim(),
            };
            onAddChat(newChat);
            setNamePerson('');
            setError(false);
            onClose;
        }
        else {
            setError(true);
            isOpen;
            setNamePerson('');
        }
        
    };

    
    return (
        <>
            <div className={`modal ${isOpen ? '' : 'hidden'}`} >
                <div className='container-close'><button className="icon-button" onClick={()=>{setError(false); onClose();}}>
                    <CloseIcon sx={{ fontSize: 40 }} className="icon close-icon" />
                </button></div>
                
                <form className="form-container"  onSubmit={createChat}>
                    <p>С кем вы хотите создать чат?</p>
                    <input className="form-text" name="text" placeholder="Введите имя собеседника" type="text" value={namePerson} onChange={(e) => setNamePerson(e.target.value)} required autoComplete="off"/>
                </form>
                {error && <p className="error-text">Введите имя собеседника.</p>}
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={()=>{setError(false); onClose();}}></div>
        </>
    );
}

export default Modal;