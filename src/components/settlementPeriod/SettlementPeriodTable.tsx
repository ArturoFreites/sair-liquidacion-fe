import { useEffect, useState } from 'react';
import { ROUTES } from '../../routes/ROUTES';
import { PaginatedTable } from '../PaginatedTable';
import { type Column } from '../Table';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SettlementPeriod } from '../../types/models/SettlementPeriod';
import { useSettlementPeriodSearch } from '../../hook/settlementPeriod/useSettlementPeriodSearch';
import { formatDate } from '../../utils/format';

export default function SettlementPeriodTable() {
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState<string>('id');
	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

	const { searchSettlementPeriod, results: files, loading: loadingFiles } = useSettlementPeriodSearch();

	useEffect(() => {
		const filters = [`eq=status:active`, `sort=${sortBy}:${sortDir}`];
		searchSettlementPeriod(filters.join('&'), page);
	}, [page, sortBy, sortDir]);

	const toggleSort = (field: string) => {
		if (sortBy === field) {
			setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortBy(field);
			setSortDir('asc');
		}
	};

	const columns: Column<SettlementPeriod>[] = [
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('id')}>
                    ID {sortBy === 'id' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => `#${b.id}`,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('year')}>
					Año {sortBy === 'year' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => `${b.year}`,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('month')}>
                    Mes {sortBy === 'month' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.month,
			cell: (v) => <span className="tabular-nums">{ v as number}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('startDate')}>
                    Fecha de Inicialización {sortBy === 'startDate' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.startDate,
			cell: (v) => <span>{formatDate(v as string)}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('endDate')}>
                    Fecha de Finalización {sortBy === 'endDate' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.endDate,
			cell: (v) => <span>{formatDate(v as string)}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('type')}>
                    Tipo {sortBy === 'type' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.type,
			cell: (v) => <span>{v as string}</span>,
		},
        {
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('status')}>
                    Estado {sortBy === 'status' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.status,
			cell: (v) => <span>{v as string}</span>,
		},
	];

	if (loadingFiles) {
		return (
			<div className="p-6">
				<Skeleton height={40} count={10} className="mb-4" />
			</div>
		);
	}

	if (!files?.data.results.length) {
		return (
			<div className="text-center text-neutral-500 text-sm p-6">
				No hay elementos para mostrar.
			</div>
		);
	}

	return (
		<PaginatedTable
			url={ROUTES.UPDATE_SETTLEMENT_PERIOD}
			data={files.data.results}
			columns={columns}
			keyField="id"
			getRowTitle={(b) => `${b.month}/${b.year}`}
			loading={loadingFiles}
			page={page}
			totalPages={files.data.totalPages}
			onPageChange={setPage}
		/>
	);
}
