import { useState } from 'react';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import type { ApiResponse } from '../../types/api/ApiResponse';
import type { User } from '../../types/models/User';

export function useLogin() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (
        email: string,
        password: string
    ): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<ApiResponse<User>>('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('name', response.data.data.name + " " + response.data.data.lastName);
            localStorage.setItem('email', response.data.data.email);
            navigate("/")
            return { success: true };
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Login failed');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}