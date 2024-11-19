import {useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import {activePerson} from '../../constant';
import { createNewChat } from '../../api/apiChat';


const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();
        setError(false);
        setData({ ...data, [name]: value });    
    }
     
    const createChat = async (event) => {
        event.preventDefault(); 
        try {
            const newChat = await createNewChat(data.id, data.title);
            console.log(data);
            onAddChat(newChat);
            setError(false);
            onClose;
        } catch (error) {
            setError(true);
            isOpen;
        }
    };

    
    return (
        <>
            <div className={`modal ${isOpen ? '' : 'hidden'}`} >
                <div className='container-close'><button className="icon-button" onClick={()=>{setError(false); onClose;}}>
                    <CloseIcon sx={{ fontSize: 40 }} className="icon close-icon" />
                </button></div>
                
                <form className="form-container"  onSubmit={createChat}>
                    <label>С кем вы хотите создать чат?</label>
                    <input className="form-text" name="id" placeholder="Введите id собеседника" type="text" value={data.id} onChange={handleChange} required autoComplete="off"/>
                    <input className="form-text" name="title" placeholder="Введите имя чата" type="text" value={data.title} onChange={handleChange} autoComplete="off"/>
                </form>
                {error && <p className="error-text">Введите id собеседника.</p>}
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={()=>{setError(false); onClose;}}></div>
        </>
    );
}

export default Modal;