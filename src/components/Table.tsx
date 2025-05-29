import React from 'react';

export type AccessorFn<T> = (row: T) => unknown;

export type Column<T> = {
    header: React.ReactNode;
    accessor: keyof T | AccessorFn<T>;
    cell?: (value: unknown, row: T) => React.ReactNode;
    className?: string;
};

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyField?: keyof T;
    getRowTitle?: (row: T) => string;
}

export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    keyField,
    getRowTitle,
}: TableProps<T>) {
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
                {data.map((row, i) => (
                    <tr
                        key={keyField ? (row[keyField] as React.Key) : i}
                        className="border-y-2 border-neutral-200 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                        title={getRowTitle?.(row)}
                    >
                        {columns.map((col, j) => {
                            
                            const value =
                                typeof col.accessor === 'function'
                                    ? (col.accessor as AccessorFn<T>)(row)
                                    : (row[col.accessor] as unknown);

                            const content = col.cell ? col.cell(value, row) : (value as React.ReactNode);

                            return (
                                <td key={j} className={`text-xs px-4 py-3 ${col.className ?? ''}`}>
                                    {content}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
