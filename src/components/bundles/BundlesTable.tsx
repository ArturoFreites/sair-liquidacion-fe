import { LEGAJOS } from '../../services/legajos';
import type { Bundle } from '../../types/Bundles.types';
import { PaginatedTable } from '../PaginatedTable';
import { type Column } from '../Table';

export default function BundlesTable() {
    const columns: Column<Bundle>[] = [
        {
            header: 'Legajo',
            accessor: (b) => `#${b.id}`
        },

        {
            header: 'Empleado',
            accessor: (b) => `${b.person.name} ${b.person.lastName}`,
            cell: (v) => <span>{v as string}</span>,
        },

        {
            header: 'DNI',
            accessor: (b) => b.person.dni,
            cell: (v) => <span className="tabular-nums">{v as number}</span>
        },

        {
            header: 'Razón Social',
            accessor: (b) => b.socialReason.name,
            cell: (v) => <span className="tabular-nums">{v as number}</span>
        },

        {
            header: 'Centro de costos',
            accessor: (b) => b.costCenter.name,
            cell: (v) => <span className="tabular-nums">{v as number}</span>
        },

        {
            header: 'Fecha de alta',
            accessor: (b) => b.createdAt,
            cell: (v) => <span className="tabular-nums">{v as number}</span>,
        },
    ];

    return (
        <PaginatedTable
            data={LEGAJOS}
            columns={columns}
            keyField="id"
            getRowTitle={(b) => `${b.person.name} ${b.person.lastName}`}
            pageSize={10}
        />
    );
}
