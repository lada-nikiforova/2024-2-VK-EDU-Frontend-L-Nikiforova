import { profile } from '../constant';
import apiClient from './apiClient';

export const getCurrentUser = async () => {
    const { data } = await apiClient.get("/api/user/current/");
    localStorage.setItem('userId', data.id);
    localStorage.setItem(profile, JSON.stringify(data));
    return data;
};
export const updateUser = async (id, userData) => {
    try {
        const { data } = await apiClient.patch(`/api/user/${id}/`, userData);
        return data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.username) {
            throw new Error(error.response.data.username[0]);
        } else {
            throw new Error("Ошибка при сохранении данных на сервере");
        }
    }
};

export const getUser = async (id) => {
    const { data } = await apiClient.get(`api/user/${id}`);
    return data;
}