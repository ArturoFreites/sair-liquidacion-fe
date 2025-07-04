/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { ConceptRequest } from '../../types/request/ConceptRequest';

export function useConceptCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createConcept = async (payload: ConceptRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null); 
        try {
            await api.post<ApiResponse<null>>('/concept', payload);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al crear Concepto');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { createConcept, loading, error };
}
