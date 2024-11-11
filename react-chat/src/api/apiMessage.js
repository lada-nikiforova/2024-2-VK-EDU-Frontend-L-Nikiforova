import apiClient from "./apiClient";

export const saveMessage = async (newMessage) => {
    try {
        console.log("Отправка:", newMessage);
        const { data } = await apiClient.post('/api/messages/', newMessage);
        console.log("Ответ от сервера:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    } 
};


export const getAllMessages = async (chatId) => {
    const { data } = await apiClient.get(`/api/messages/?chat=${chatId}`);
    return data.results;
};