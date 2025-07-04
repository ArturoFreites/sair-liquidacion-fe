/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { NoveltySalaryRequest } from '../../types/request/NoveltySalaryRequest';

export function useNoveltySalaryCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createNoveltySalary = async (payload: NoveltySalaryRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null); 
        try {
            await api.post<ApiResponse<null>>('/novelty/salary', payload);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al actualizar Sueldo');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { createNoveltySalary, loading, error };
}
