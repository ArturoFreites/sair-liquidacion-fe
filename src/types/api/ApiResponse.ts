import type { UtilResponse } from './UtilResponse';
import type { PaginationResponse } from './PaginationResponse';

// Respuesta simple (ej: /bank/:id)
export type ApiResponse<T> = UtilResponse<T>;

// Respuesta paginada (ej: /bank?page=1)
export type PaginatedApiResponse<T> = UtilResponse<PaginationResponse<T>>;