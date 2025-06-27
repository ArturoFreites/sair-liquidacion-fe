export type UtilResponse<T> = {
    data: T;
    code: number;
    message: string;
    errors: string[] | null;
};