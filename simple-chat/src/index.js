"use strict"
import './index.css';
import {load} from './js/storage';
import {handleSubmit} from './js/submit';
import {openChatPage} from './js/openChat.js';
import {displayLastMessage} from './js/lastMessage';
import { editChat } from './js/editChat';

const form = document.querySelector('form');
const sendButton = document.querySelector('.send');
const chatButton = document.getElementById('list-button');

const chatListPage = document.getElementById('chat-list');
const chatPage = document.getElementById('chat-page');


chatButton.addEventListener('click', function(){location.reload(); chatPage.classList.add('hidden'); chatListPage.classList.remove('hidden'); localStorage.setItem('activePage', 'chatList');});
document.getElementById('chat1Button').addEventListener('click', () => openChatPage('chat1', 'chat1-container'));
document.getElementById('chat2Button').addEventListener('click', () => openChatPage('chat2', 'chat2-container'));
sendButton.addEventListener('click',(event)=>handleSubmit(event));
form.addEventListener('submit', (event)=>handleSubmit(event));
displayLastMessage('chat1', document.getElementById('chat1Button'));
displayLastMessage('chat2', document.getElementById('chat2Button'));
document.querySelector('.edit-button').addEventListener('click',() =>  editChat());
window.addEventListener('DOMContentLoaded', () => load());

