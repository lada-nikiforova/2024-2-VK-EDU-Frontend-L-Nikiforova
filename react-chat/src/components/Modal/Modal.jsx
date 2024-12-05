import {useEffect, useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import {activePerson} from '../../constant';
import { createNewChat } from '../../api/apiChat';
import { getUsers } from '../../api/apiUser';
import Loader from '../Loader/Loader';


const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
    const [users, setUsers] = useState({ results: [] });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();
        setData({ ...data, [name]: value });    
    }
    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId) 
                : [...prevSelected, userId] 
        );
    };
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = {
                search,
                page
            };
            const data = await getUsers(params); 
            setUsers(data); 
            setNext(data.next); 
            setPrevious(data.previous); 
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [page, search]);
    const handleSearchChange = (event) => {
        setSearch(event.target.value); // Обновляем поисковый запрос
        setPage(1); // Сбрасываем страницу на первую при новом поиске
    };
    const handlePageChange = (newPage) => {
        setPage(newPage); 
    };
    const createChat = async (event) => {
        event.preventDefault(); 
        if (selectedUsers.length === 0) {
            setError(true);
            return;
        }
        try {
            const newChat = await createNewChat(selectedUsers, data.title);
            console.log(data);
            onAddChat(newChat);
            setError(false);
            onClose;
        } catch (error) {
            setError(true);
            isOpen;
        }
    };
    const createList = async () => {
        const listUsers = await getUsers();
        setUsers(listUsers)
        console.log(listUsers);
    }
    useEffect(()=>{
        createList();
    }, []);
    if (loading) {
        <Loader/>
    }

    
    return (
        <>
            <div className={`modal ${isOpen ? '' : 'hidden'}`} >
                <div className='container-close'>
                    <p>С кем вы хотите создать чат?</p>
                    <button className="close-button" onClick={()=>{setError(false); onClose(); setSelectedUsers([]);}}>
                        <CloseIcon sx={{ fontSize: 30 }} className="icon close-icon" />
                    </button>
                </div>
                
                
                <form className="form-container" onSubmit={createChat}>
                    <input className="form-text" id='search' name="search" placeholder="Поиск пользователя" type="text" value={data.username} onChange={handleSearchChange} autoComplete="off"/>
                    {selectedUsers.length > 1 && (
                        <>
                            <input
                                className="form-text"
                                name="title"
                                placeholder="Введите имя чата"
                                type="text"
                                value={data.title}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </>
                    )}
                </form>
                <form className='list-container'>
                    {users.results.map((us) => (
                        <div div key={us.id} className='list-users'>
                            <input id={`user-${us.id}`} checked={selectedUsers.includes(us.id)} onChange={() => handleUserSelect(us.id)} type="checkbox"></input>
                            <label for={`user-${us.id}`}>{us.username}</label>
                        </div>
                    ))}
                    
                </form>
                <div className='nav-button'>
                    <button onClick={() => handlePageChange(page - 1)} disabled={!previous || loading}>Назад</button>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!next || loading}>Вперед</button>  
                </div>
                {error && <p className="error-txt">Выберите хотя бы одного собеседника.</p>}
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={()=>{setError(false); onClose();setSelectedUsers([]);}}></div>
        </>
    );
}

export default Modal;