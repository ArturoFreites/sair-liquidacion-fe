import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import type { SettlementPeriod } from '../../types/models/SettlementPeriod';

export function useSettlementPeriodSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<SettlementPeriod[]>>();

    const searchSettlementPeriod = async (query: string, page: number = 1): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<SettlementPeriod[]>>(
                `/settlementPeriod?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Error al buscar Periodos.');
        } finally {
            setLoading(false);
        }
    };

    return { searchSettlementPeriod, results, loading, error };
}
