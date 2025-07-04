/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
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
        } catch (err:any) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { searchSocialReasonSearch, results, loading, error };
}
