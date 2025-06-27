import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { AxiosError } from 'axios';
import type { SocialReason } from '../../types/models/SocialReason';

export function useSocialReasonSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PaginatedApiResponse<SocialReason[]>>();

    const searchSocialReasonSearch = async (query: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<PaginatedApiResponse<SocialReason[]>>(`/socialReason?${query}`);
            setResults(response.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { searchSocialReasonSearch, results, loading, error };
}
