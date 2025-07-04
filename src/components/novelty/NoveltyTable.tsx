import { useEffect, useState } from 'react';
import { ROUTES } from '../../routes/ROUTES';
import type { File } from '../../types/models/File';
import { PaginatedTable } from '../PaginatedTable';
import { type Column } from '../Table';
import { useFileSearch } from '../../hook/file/useFileSearch';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDni } from '../../utils/format';

export default function NoveltyTable() {
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState<string>('id');
	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

	const { searchFile, results: files, loading: loadingFiles } = useFileSearch();

	useEffect(() => {
		const filters = [`eq=status:active`, `sort=${sortBy}:${sortDir}`];
		searchFile(filters.join('&'), page);
	}, [page, sortBy, sortDir]);

	const toggleSort = (field: string) => {
		if (sortBy === field) {
			setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortBy(field);
			setSortDir('asc');
		}
	};

	const columns: Column<File>[] = [
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('id')}>
                    Legajo {sortBy === 'id' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => `#${b.id}`,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('person.name')}>
					Empleado {sortBy === 'person.name' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => `${b.person.name} ${b.person.lastName}`,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('person.dni')}>
                    DNI {sortBy === 'person.dni' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => formatDni(b.person.dni),
			cell: (v) => <span className="tabular-nums">{v as number}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('socialReason.name')}>
                    Razón Social {sortBy === 'socialReason.name' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.socialReason.name,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('costCenter.name')}>
                    Centro de costos {sortBy === 'costCenter.name' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => b.costCenter.name,
			cell: (v) => <span>{v as string}</span>,
		},
		{
			header: (
				<span className="cursor-pointer select-none flex items-center" onClick={() => toggleSort('createdAt')}>
                    Fecha de alta {sortBy === 'createdAt' && (sortDir === 'asc' ? <ChevronUp height={15} width={15}/> : <ChevronDown height={15} width={15} />)}
				</span>
			),
			accessor: (b) => new Date(b.createdAt).toLocaleDateString(),
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
			url={ROUTES.DETAIL_NOVELTY}
			data={files.data.results}
			columns={columns}
			keyField="id"
			getRowTitle={(b) => `${b.person.name} ${b.person.lastName}`}
			loading={loadingFiles}
			page={page}
			totalPages={files.data.totalPages}
			onPageChange={setPage}
		/>
	);
}
