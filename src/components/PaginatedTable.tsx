// PaginatedTable.tsx
import { useState, useMemo } from 'react';
import { Table, type TableProps } from './Table';

interface PaginatedTableProps<T> extends Omit<TableProps<T>, 'data'> {
    data: T[];
    pageSize?: number;
}

export function PaginatedTable<T extends Record<string, unknown>>({
    data,
    columns,
    keyField,
    getRowTitle,
    pageSize = 10,
}: PaginatedTableProps<T>) {
    /* --------- Estado --------- */
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

    /* --------- Segmenta datos --------- */
    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    /* --------- Ventana deslizante de 5 botones --------- */
    const windowStart = Math.floor((page - 1) / 5) * 5 + 1;
    const windowEnd = Math.min(windowStart + 4, totalPages);
    const pageNumbers = Array.from(
        { length: windowEnd - windowStart + 1 },
        (_, i) => windowStart + i,
    );

    /* --------- Handlers --------- */
    const goTo = (p: number) => setPage(Math.min(Math.max(p, 1), totalPages));

    return (
        <div>
            {/* ---- Tabla ---- */}
            <Table
                data={pageData}
                columns={columns}
                keyField={keyField}
                getRowTitle={getRowTitle}
            />

            {/* ---- Paginación ---- */}
            <div className="flex items-center justify-center gap-1">
                <button
                    onClick={() => goTo(page - 1)}
                    disabled={page === 1}
                    className="cursor-pointer px-2 py-1 text-sm rounded disabled:opacity-40 hover:text-neutral-600"
                >
                    Anterior
                </button>

                {pageNumbers.map((p) => (
                    <button
                        key={p}
                        onClick={() => goTo(p)}
                        className={`px-3 py-1 text-sm rounded ${p === page ? 'font-semibold bg-blue-900 text-white' : 'hover:bg-gray-200'
                            }`}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => goTo(page + 1)}
                    disabled={page === totalPages}
                    className="cursor-pointer px-2 py-1 text-sm rounded disabled:opacity-40 hover:bg-gray-200"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
