import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { Bank } from '../../types/models/Bank';
import type { AxiosError } from 'axios';

export function useBankSearcher() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<Bank[]>>();

    const searchBanks = async (query: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<Bank[]>>(`/bank?${query}`);
            setResults(response.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { searchBanks, results, loading, error };
}
