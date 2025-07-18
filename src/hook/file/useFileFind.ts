/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';

import type { File } from '../../types/models/File';

export function useFileFind() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<File>();

    const findFile = async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiResponse<File>>(`/file/${id}`);
            setResult(response.data.data);
        } catch (err:any) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { findFile, result, loading, error };
}
