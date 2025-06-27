import { useState } from "react";
import type { ApiResponse } from "../../types/api/ApiResponse";
import api from "../../api/axiosConfig";
import type { ConceptRequest } from "../../types/request/ConceptRequest";

export function useConceptUpdate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateConcept = async (payload: ConceptRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null);
        try {
            await api.put<ApiResponse<null>>('/concept', payload);
            return { success: true };
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Error al actualizar Concepto');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { updateConcept, loading, error };
}