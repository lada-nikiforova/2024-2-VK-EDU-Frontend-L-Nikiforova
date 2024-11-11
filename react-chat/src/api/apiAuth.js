import apiClient from './apiClient';

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/api/register/', userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/', credentials);
    const access_token = response.data.access; 
    const refresh_token = response.data.refresh;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete apiClient.defaults.headers.common['Authorization'];
};
