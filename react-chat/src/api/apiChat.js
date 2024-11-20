import apiClient from "./apiClient";
import { getUser } from "./apiUser";

export const getChat = async (id) => {
    const { data } = await apiClient.get(`/api/chat/${id}`);
    return data;
};

export const getAllChats = async () => {
    const { data } = await apiClient.get("/api/chats/");
    return data.results;
};


export const createNewChat = async (id, title) => {
    let chatTitle = title;

    if (!title) {
        try {
            const user = await getUser(id);
            chatTitle = user.username;
        } catch (error) {
            console.error("Ошибка получения имени пользователя:", error);
        }
    }
    const { data } = await apiClient.post('/api/chats/',
      {
        "is_private": true,
        "members": [
            id
        ],
        title: chatTitle

      }
    );
    return data;
};

