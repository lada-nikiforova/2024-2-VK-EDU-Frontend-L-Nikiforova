import {useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import {activePerson} from '../../constant';
import { createNewChat } from '../../api/apiChat';


const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [namePerson, setNamePerson] = useState(''); 
    const [error, setError] = useState(false);
    const [nameChat, setNameChat] = useState();
     
    const createChat = async (event) => {
        event.preventDefault(); 
        if (namePerson.trim().length){
            const newChat = await createNewChat(namePerson, nameChat);
            onAddChat(newChat);
            setNameChat('');
            setNamePerson('');
            setError(false);
            onClose();
        }
        else {
            setError(true);
            isOpen();
            setNamePerson('');
            setNameChat('');
        }
        
    };

    
    return (
        <>
            <div className={`modal ${isOpen ? '' : 'hidden'}`} >
                <div className='container-close'><button className="icon-button" onClick={()=>{setError(false); onClose();}}>
                    <CloseIcon sx={{ fontSize: 40 }} className="icon close-icon" />
                </button></div>
                
                <form className="form-container"  onSubmit={createChat}>
                    <label>С кем вы хотите создать чат?</label>
                    <input className="form-text" name="text" placeholder="Введите id собеседника" type="text" value={namePerson} onChange={(e) => setNamePerson(e.target.value)} required autoComplete="off"/>
                    <input className="form-text" name="text" placeholder="Введите имя чата" type="text" value={nameChat} onChange={(e) => setNameChat(e.target.value)} autoComplete="off"/>
                </form>
                {error && <p className="error-text">Введите id собеседника.</p>}
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={()=>{setError(false); onClose();}}></div>
        </>
    );
}

export default Modal;