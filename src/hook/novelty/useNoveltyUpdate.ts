/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { NoveltyRequest } from '../../types/request/NoveltyRequest';

export function useNoveltyUpdate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateNovelty = async (payload: NoveltyRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null); 
        try {
            await api.put<ApiResponse<null>>('/novelty', payload);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al actualizar Novedad');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { updateNovelty, loading, error };
}
