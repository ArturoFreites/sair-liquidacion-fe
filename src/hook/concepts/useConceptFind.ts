/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { Concept } from '../../types/models/Concept';

export function useConceptFind() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<Concept>();

    const findConcept = async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiResponse<Concept>>(`/concept/${id}`);
            setResult(response.data.data);
        } catch (err:any) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { findConcept, result, loading, error };
}
