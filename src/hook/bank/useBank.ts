/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { PaginatedApiResponse } from '../../types/api/ApiResponse';
import api from '../../api/axiosConfig';
import type { Bank } from '../../types/models/Bank';

export function useBankSearcher() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [results, setResults] = useState<PaginatedApiResponse<Bank[]>>();

	const searchBanks = async (query: string): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const response = await api.get<PaginatedApiResponse<Bank[]>>(`/bank?${query}`);
			setResults(response.data);
		} catch (err: any) {
			const message = err?.response?.data?.message ?? 'Error inesperado';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return { searchBanks, results, loading, error };
}
