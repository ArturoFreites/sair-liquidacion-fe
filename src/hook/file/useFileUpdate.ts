/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { FileRequest } from "../../types/request/FileRequest";
import type { ApiResponse } from "../../types/api/ApiResponse";
import api from "../../api/axiosConfig";

export function useFileUpdate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFile = async (payload: FileRequest): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null);
        try {
            await api.put<ApiResponse<null>>('/file', payload);
            return { success: true };
        } catch (err:any) {
            setError(err.response?.data?.message || 'Error al crear legajo');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { updateFile, loading, error };
}