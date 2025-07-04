import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import type { Novelty } from '../../types/models/Novelty';

export function useNoveltySearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<Novelty[]>>();

    const searchNovelty = async (query: string="", page: number = 0): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<Novelty[]>>(
                `/novelty?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Error al buscar Novedades.');
        } finally {
            setLoading(false);
        }
    };

    return { searchNovelty, results, loading, error };
}
