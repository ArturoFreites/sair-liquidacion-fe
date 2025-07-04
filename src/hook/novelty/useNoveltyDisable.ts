/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';

export function useNoveltyCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createNovelty = async (id: number): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null); 
        try {
            await api.put<ApiResponse<null>>(`/novelty/disatble/${id}`);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al desactivar Novedad');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { createNovelty, loading, error };
}
