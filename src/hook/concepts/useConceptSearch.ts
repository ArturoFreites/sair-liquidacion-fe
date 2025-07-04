/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { Concept } from '../../types/models/Concept';

export function useConceptSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<Concept[]>>();

    const searchConcept = async (query: string, page: number = 0): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<Concept[]>>(
                `/concept?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al buscar Conceptos.');
        } finally {
            setLoading(false);
        }
    };

    return { searchConcept, results, loading, error };
}
