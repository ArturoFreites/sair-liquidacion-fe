/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { File } from '../../types/models/File';

export function useFileSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<File[]>>();

    const searchFile = async (query: string, page: number = 1): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<File[]>>(
                `/file?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al buscar archivos.');
        } finally {
            setLoading(false);
        }
    };

    return { searchFile, results, loading, error };
}
