/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { SettlementPeriod } from '../../types/models/SettlementPeriod';

export function useSettlementPeriodSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<SettlementPeriod[]>>();

    const searchSettlementPeriod = async (query: string, page: number = 0): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<SettlementPeriod[]>>(
                `/settlementPeriod?${query}&page=${page}`
            );
            setResults(response.data);
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al buscar Periodos.');
        } finally {
            setLoading(false);
        }
    };

    return { searchSettlementPeriod, results, loading, error };
}
