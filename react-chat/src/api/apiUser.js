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
        console.error("Не удалсь обновить информацию:", error);
        throw error;
    }
};

export const getUser = async (id) => {
    const { data } = await apiClient.get(`api/user/${id}`);
    return data;
}