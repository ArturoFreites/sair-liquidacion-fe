import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import type { Concept } from '../../types/models/Concept';

export function useConceptSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<Concept[]>>();

    const searchConcept = async (query: string, page: number = 1): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<Concept[]>>(
                `/concept?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Error al buscar Conceptos.');
        } finally {
            setLoading(false);
        }
    };

    return { searchConcept, results, loading, error };
}
