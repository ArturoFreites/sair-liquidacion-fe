import React from 'react';
import { useNavigate } from 'react-router-dom';

export type AccessorFn<T> = (row: T) => unknown;

export type Column<T> = {
    header: React.ReactNode;
    accessor: keyof T | AccessorFn<T>;
    cell?: (value: unknown, row: T) => React.ReactNode;
    className?: string;
};

export interface TableProps<T> {
    url: string;
    data: T[];
    columns: Column<T>[];
    keyField?: keyof T;
    getRowTitle?: (row: T) => string;
}

export function Table<T extends Record<string, unknown>>({
    url,
    data,
    columns,
    keyField,
    getRowTitle,
}: TableProps<T>) {

    const navigate = useNavigate()

    return (
        <table className="min-w-full divide-y divide-gray-200 text-sm my-8">
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th
                            key={i}
                            className={`px-4 py-2 text-left font-semibold tracking-wider ${col.className ?? ''
                                }`}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => {
                    const rowKey = keyField ? row[keyField] : i;

                    const buildLink = (base: string, id: unknown) =>
                        base.includes(':id') ? base.replace(':id', String(id)) : `${base}/${id}`;

                    const link = buildLink(url, rowKey);

                    return (
                        <tr
                            key={rowKey as React.Key}
                            onClick={() => navigate(link)}
                            className="border-y-2 border-neutral-200 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                            title={getRowTitle?.(row)}
                        >
                            {columns.map((col, j) => {
                                const value =
                                    typeof col.accessor === 'function'
                                        ? (col.accessor as AccessorFn<T>)(row)
                                        : row[col.accessor];

                                const content = col.cell ? col.cell(value, row) : (value as React.ReactNode);

                                return (
                                    <td key={j} className={`text-xs px-4 py-3 ${col.className ?? ''}`}>
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
