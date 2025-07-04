import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import type { SettlementPeriod } from '../../types/models/SettlementPeriod';

export function useFindSettlementPeriodLast() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SettlementPeriod>();

    const findSettlementPeriodLast = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiResponse<SettlementPeriod>>(`/settlementPeriod/last`);
            setResult(response.data.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { findSettlementPeriodLast, result, loading, error };
}
