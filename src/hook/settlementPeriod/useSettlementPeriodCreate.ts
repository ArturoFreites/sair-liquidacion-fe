/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { SettlementPeriodRequest } from '../../types/request/SettlementPeriodRequest';

export function useSettlementPeriodCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createSettlementPeriod = async (payload: SettlementPeriodRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null); 
        try {
            await api.post<ApiResponse<null>>('/settlementPeriod', payload);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al crear el periodo');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { createSettlementPeriod, loading, error };
}
