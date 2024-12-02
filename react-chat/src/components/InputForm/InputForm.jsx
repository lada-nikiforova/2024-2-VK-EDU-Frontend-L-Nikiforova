import {useState, useEffect, useRef} from 'react';
import './InputForm.scss';
import  SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import {activeChatId, activePerson} from '../../constant';

const InputForm = ({onAddMessage}) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const chatId = localStorage.getItem(activeChatId);
    const [isDragOver, setDragOver] = useState(false);
    const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const inputRef = useRef(null);
    const [isInputFocused, setInputFocused] = useState(false);

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
            onAddMessage(newMessage);            
            setMessage('');
            setError(false);
            inputRef.current.blur(); 
            setInputFocused(false);
        }
        else{
            setError(true);
            setMessage('');
        }
    };
    const handleFile = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length) {
            setFiles(selectedFiles);
            const formData = new FormData();
            formData.append('chat', chatId);
            selectedFiles.forEach((file) => formData.append('files', file));
            onAddMessage(formData);
            setAttachmentMenuOpen(false);
        }
    };

    const getLocation = () =>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Геолокация не поддерживается.");
        }
    };
    
    const showPosition = (position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        const newMessage = {
            text: `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
            chat: chatId, 
        };
        onAddMessage(newMessage);
        setAttachmentMenuOpen(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOver(false);
        const selectedFiles = Array.from(event.dataTransfer.files);
        if (selectedFiles.length) {
            setFiles(selectedFiles);
            const formData = new FormData();
            formData.append('chat', chatId);
            selectedFiles.forEach((file) => formData.append('files', file));
            onAddMessage(formData);
            setAttachmentMenuOpen(false);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOver(false);
    };
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunks.current = [];
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };    
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
                console.log(audioBlob);
                const file = new File([audioBlob], "voice.mp3", { type: 'audio/mp3' })
                const formData = new FormData();
                formData.append("chat", chatId);
                formData.append("voice", file);
                onAddMessage(formData);
            };
    
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };    
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    return (
        <div className="lower" onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
                <div className="attachment-wrapper">
                    <button className="icon-button" onClick={toggleAttachmentMenu}>
                        <AttachFileIcon sx={{ fontSize: 40 }} className="icon" />
                    </button>
                    {isAttachmentMenuOpen && (
                        <div className="attachment-menu">
                            <button onClick={getLocation}>Геопозиция</button>
                            <button onChange={handleFile}>
                                <label htmlFor="file-upload" className="file-upload-label">Фото</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    multiple
                                    
                                />
                            </button>
                        </div>
                    )}
                </div>
                <form className="form" onSubmit={(e) => {  e.preventDefault(); createMessage(e);}}>
                    <input className={`form-input ${error ? 'error' : ''}`} name="message-text" 
                            ref={inputRef} placeholder={error ? "Введите корректное сообщение..." : "Введите сообщение..."} 
                            type="text" value={message} onChange={(e) => setMessage(e.target.value)} 
                            required autoComplete="off" onFocus={() => setInputFocused(true) }  onBlur={() => setInputFocused(false)}
                            />                      
                    
                </form>
                {isInputFocused ? (
                    <button className="send icon-button" onClick={(e) => { e.preventDefault(); createMessage(e);}} onMouseDown={(e) => e.preventDefault()}><SendIcon sx={{ fontSize: 40 }} className="icon" /></button> 
                ) : (
                    <button className="icon-button" onClick={isRecording ? stopRecording : startRecording}>
                        {isRecording ? (
                            <StopIcon sx={{ fontSize: 40 }} className="icon recording" />
                            ) : (
                            <MicIcon sx={{ fontSize: 40 }} className="icon" />
                            )}
                    </button> 
                )}   
        </div>
    );
}

export default InputForm;