export type PaginationResponse<T> = {
    results: T;
    page: number;
    totalItems: number;
    totalPages: number;
};
