import {useCallback, useEffect, useState} from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { createNewChat } from '../../api/apiChat';
import { getUsers } from '../../api/apiUser';
import Loader from '../Loader/Loader';
import  debounce  from 'lodash.debounce';


const Modal = ({ isOpen, onClose, onAddChat}) => {
    const [error, setError] = useState({create_chat: false, title: false});
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
        const value = event.target.value;
        setData({ ...data, [name]: value });  
        setError({ ...error, [name]: false});
    }
    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId) 
                : [...prevSelected, userId] 
        );
    };
    const debouncedFetchUsers = useCallback(
        debounce((searchTerm, pageNum) => {
            fetchUsers({ search: searchTerm, page: pageNum });
        }, 300),
        []
    );
    const fetchUsers = async (params) => {
        setLoading(true);
        try {
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
        const value = event.target.value;
        setSearch(value);
        setPage(1);
        debouncedFetchUsers(value, 1);
    };
    const handlePageChange = (newPage) => {
        setPage(newPage); 
        fetchUsers({ search, page: newPage });
    };
    useEffect(() => {
        return () => {
            debouncedFetchUsers.cancel();
        };
    }, [debouncedFetchUsers]);

    const createChat = async (event) => {
        event.preventDefault(); 
        if (selectedUsers.length === 0) {
            setError({create_chat: true, title: false});
            return;
        }
        try {
            const newChat = await createNewChat(selectedUsers, data.title);
            console.log(data);
            onAddChat(newChat);
            setError({create_chat: false, title: false});
            onClose;
        } catch {
            setError({create_chat: false, title: true});
            setData((prevData) => ({ ...prevData, title: '' }));
            isOpen;
        }
    };
    const createList = async () => {
        const listUsers = await getUsers();
        setUsers(listUsers)
        // console.log(listUsers);
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
                    <button className="close-button" onClick={(e)=>{e.preventDefault(); setError({create_chat: false, title: false}); onClose(); setSelectedUsers([]); setData({}); setSearch('');}}>
                        <CloseIcon sx={{ fontSize: 30 }} className="icon close-icon" />
                    </button>
                </div>
                
                
                <form className="form-container" onSubmit={createChat}>
                    <input className="form-text" id='search' name="search" placeholder="Поиск пользователя" type="text" value={search} onChange={handleSearchChange} autoComplete="off"/>
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
                        <div key={us.id} className='list-users'>
                            <input id={`user-${us.id}`} checked={selectedUsers.includes(us.id)} onChange={() => handleUserSelect(us.id)} type="checkbox"></input>
                            <label htmlFor={`user-${us.id}`}>{us.username}</label>
                        </div>
                    ))}
                    
                </form>
                <div className='nav-button'>
                    <button onClick={() => handlePageChange(page - 1)} disabled={!previous || loading}>Назад</button>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!next || loading}>Вперед</button>  
                </div>
                {error.create_chat && <p className="error-txt">Выберите хотя бы одного собеседника.</p>}
                {error.title && <p className="error-txt">Введите корректное имя чата.</p>}
                <button onClick={createChat} className="button-create-chat">Создать чат</button>
            </div>
            <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={(e)=>{e.preventDefault(); setError({create_chat: false, title: false});  onClose(); setSelectedUsers([]); setData({}); setSearch('');}}></div>
        </>
    );
}

export default Modal;