import { Table, type TableProps } from './Table';
import Skeleton from 'react-loading-skeleton';

interface PaginatedTableProps<T> extends Omit<TableProps<T>, 'data'> {
    data?: T[];
    loading?: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginatedTable<T>({
    url,
    data = [],
    columns,
    keyField,
    getRowTitle,
    loading = false,
    page,
    totalPages,
    onPageChange,
}: PaginatedTableProps<T>) {
    const windowSize = 5;
    const windowStart = Math.floor(page / windowSize) * windowSize;
    const windowEnd = Math.min(windowStart + windowSize - 1, totalPages - 1);
    const pageNumbers = Array.from(
        { length: windowEnd - windowStart + 1 },
        (_, i) => windowStart + i
    );

    return (
        <div className="w-full">
            {loading ? (
                <Skeleton rows={10} />
            ) : data.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No hay elementos para mostrar.</p>
            ) : (
                <>
                    <Table<T>
                        url={url}
                        data={data}
                        columns={columns}
                        keyField={keyField}
                        getRowTitle={getRowTitle}
                    />

                    <div className="flex items-center justify-center gap-1 mt-4">
                        {page > 0 && (
                            <button
                                onClick={() => onPageChange(page - 1)}
                                className="cursor-pointer px-2 py-1 text-sm rounded hover:text-neutral-600"
                            >
                                Anterior
                            </button>
                        )}

                        {pageNumbers.map((p) => (
                            <button
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={`px-3 py-1 text-sm rounded ${p === page ? 'font-semibold bg-blue-900 text-white' : 'hover:bg-gray-200'}`}
                            >
                                {p + 1}
                            </button>
                        ))}

                        {page < totalPages - 1 && (
                            <button
                                onClick={() => onPageChange(page + 1)}
                                className="cursor-pointer px-2 py-1 text-sm rounded hover:bg-gray-200"
                            >
                                Siguiente
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
