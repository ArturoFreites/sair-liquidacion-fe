/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { CostCenter } from '../../types/models/CostCenter';

export function useCostCenterSearcher() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<CostCenter[]>>();

    const searchCostCenter = async (query: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<CostCenter[]>>(`/costCenter?${query}`);
            setResults(response.data);
        } catch (err:any) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { searchCostCenter, results, loading, error };
}
