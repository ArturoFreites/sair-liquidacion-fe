// src/api/axiosConfig.ts
import axios from 'axios';
import { useErrorModalStore } from '../store/errorModalStore';

const api = axios.create({
    baseURL: 'http://localhost:8080/sair/api',
    withCredentials: true,
});

const { showError } = useErrorModalStore.getState();

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        showError(error,"error",false);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            localStorage.removeItem('token');
            showError('Sesión expirada. Por favor inicia sesión nuevamente.',"error",true);
        } else {
            const message = error.response?.data?.message || 'Ocurrió un error inesperado';
            showError(message,"error",false);
        }
        return Promise.reject(error);
    }
);

export default api;
