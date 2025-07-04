import { useEffect, useState } from 'react';
import { ROUTES } from '../../routes/ROUTES';
import { PaginatedTable } from '../PaginatedTable';
import { type Column } from '../Table';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useConceptSearch } from '../../hook/concepts/useConceptSearch';
import type { Concept } from '../../types/models/Concept';

export default function ConceptTable() {
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState<string>('id');
	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

	const { searchConcept, results: files, loading: loadingFiles } = useConceptSearch();

	useEffect(() => {
		const filters = [`eq=status:active`, `sort=${sortBy}:${sortDir}`];
		searchConcept(filters.join('&'), page);
	}, [page, sortBy, sortDir]);

	const toggleSort = (field: string) => {
		if (sortBy === field) {
			setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortBy(field);
			setSortDir('asc');
		}
	};

	const columns: Column<Concept>[] = [
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
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('name')}>
					Nombre {sortBy === 'name' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => `${b.name}`,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('impact')}>
                    Impacto {sortBy === 'impact' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.impact,
			cell: (v) => <span className="tabular-nums">{v as number}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('typeValue')}>
                    Tipo {sortBy === 'typeValue' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.typeValue,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('frequency')}>
                    Frecuencia {sortBy === 'frequency' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.frequency,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('paymentType')}>
                    Deposito {sortBy === 'paymentType' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.paymentType,
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
			url={ROUTES.UPDATE_CONCEPT}
			data={files.data.results}
			columns={columns}
			keyField="id"
			getRowTitle={(b) => `${b.name}`}
			loading={loadingFiles}
			page={page}
			totalPages={files.data.totalPages}
			onPageChange={setPage}
		/>
	);
}
