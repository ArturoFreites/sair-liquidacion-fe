/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNoveltySearch } from '../../hook/novelty/useNoveltySearch';
import { useNoveltyCreate as useNoveltyDisable } from '../../hook/novelty/useNoveltyDisable';
import { useNoveltyUpdate } from '../../hook/novelty/useNoveltyUpdate';
import { useNoveltyCreate } from '../../hook/novelty/useNoveltyCreate';
import { useFindSettlementPeriodLast } from '../../hook/settlementPeriod/useSettlementPeriodLast';
import { useParams } from 'react-router-dom';

import type { NoveltyRequest } from '../../types/request/NoveltyRequest';
import NoveltyRow from './NoveltyRow';
import NoveltyNewRow from './NoveltyNewRow';

function NoveltyDetailTable() {
    const { id } = useParams() as { id: string };

    const { searchNovelty, results: novelties, loading, error } = useNoveltySearch();
    const totalPages = novelties?.data.totalPages ?? 1;
    const { updateNovelty } = useNoveltyUpdate();
    const { createNovelty } = useNoveltyCreate();
    const { createNovelty: disableNovelty } = useNoveltyDisable();
    const { findSettlementPeriodLast, result: settlementPeriodLast } = useFindSettlementPeriodLast();

    const [currentPage, setCurrentPage] = useState(0);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<NoveltyRequest | null>(null);
    const [showNewRow, setShowNewRow] = useState(false);

    // 🔽 Estados nuevos
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const [newData, setNewData] = useState<NoveltyRequest>({
        id: '',
        conceptId: 0,
        fileId: Number(id),
        settlementPeriodId: 0,
        quota: 0,
        totalQuota: 0,
        value: 0,
        origin: ''
    });

    useEffect(() => {
        findSettlementPeriodLast();
    }, []);

    useEffect(() => {
        if (settlementPeriodLast) {
            setSelectedMonth(settlementPeriodLast.month);
            setSelectedYear(settlementPeriodLast.year);
            setNewData(prev => ({
                ...prev,
                settlementPeriodId: settlementPeriodLast.id
            }));
        }
    }, [settlementPeriodLast]);

    useEffect(() => {
        if (!id || !selectedMonth || !selectedYear) return;
        const baseFilter = `eq=file.id:${id}`;
        const periodFilter = `&eq=settlementPeriod.month:${selectedMonth}&eq=settlementPeriod.year:${selectedYear}`;
        searchNovelty(`${baseFilter}${periodFilter}`, currentPage);
    }, [currentPage, id, selectedMonth, selectedYear]);

    const handleSave = async (noveltyId: number) => {
        if (!editData) return;
        const payload: NoveltyRequest = { ...editData, id: String(noveltyId) };
        const { success } = await updateNovelty(payload);
        if (success) {
            resetEditState();
            searchNovelty(`eq=file.id:${id};eq=settlementPeriod.month:${selectedMonth};eq=settlementPeriod.year:${selectedYear}`, currentPage);
        }
    };

    const handleDisable = async (noveltyId: number) => {
        const { success } = await disableNovelty(noveltyId);
        if (success) {
            searchNovelty(`eq=file.id:${id};eq=settlementPeriod.month:${selectedMonth};eq=settlementPeriod.year:${selectedYear}`, currentPage);
        }
    };

    const handleCreate = async (data: NoveltyRequest) => {
        const { success } = await createNovelty(data);
        if (success) {
            setNewData(prev => ({
                ...prev,
                id: '',
                value: 0,
                quota: 0,
                totalQuota: 0,
                origin: ''
            }));
            setShowNewRow(false);
            searchNovelty(`eq=file.id:${id};eq=settlementPeriod.month:${selectedMonth};eq=settlementPeriod.year:${selectedYear}`, currentPage);
        }
    };

    const resetEditState = () => {
        setEditIndex(null);
        setEditData(null);
    };

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const formatMonthYear = () => {
        if (!selectedMonth || !selectedYear) return 'Período no disponible';
        const date = new Date(selectedYear, selectedMonth - 1);
        return `${capitalize(date.toLocaleDateString('es-AR', { month: 'long' }))} ${date.getFullYear()}`;
    };

    const handleEdit = (index: number, data: NoveltyRequest) => {
        setEditIndex(index);
        setEditData(data);
    };

    const handleChange = (field: keyof NoveltyRequest, value: any) => {
        setEditData(prev => prev ? { ...prev, [field]: value } : null);
    };

    return (
        <div className="p-4 bg-white w-full">
            <div className="grid grid-cols-2 items-center mb-4">
                <div className="flex items-center space-x-2">
                    <select
                        value={selectedMonth ?? ''}
                        onChange={e => setSelectedMonth(Number(e.target.value))}
                        className="font-semibold text-white bg-blue-900 rounded-md p-1 text-sm"
                    >
                        <option className='bg-white text-neutral-800' value="">Mes</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option className='bg-white text-neutral-800' key={i + 1} value={i + 1}>
                                {capitalize(new Date(0, i).toLocaleString('es-AR', { month: 'long' }))}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear ?? ''}
                        onChange={e => setSelectedYear(Number(e.target.value))}
                        className="font-semibold text-white bg-blue-900 rounded-md p-1 text-sm"
                    >
                        <option className='bg-white text-neutral-800' value="">Año</option>
                        {settlementPeriodLast && (
                            <>
                                <option className='bg-white text-neutral-800' value={settlementPeriodLast.year}>{settlementPeriodLast.year}</option>
                                <option className='bg-white text-neutral-800' value={settlementPeriodLast.year - 1}>{settlementPeriodLast.year - 1}</option>
                                <option className='bg-white text-neutral-800' value={settlementPeriodLast.year + 1}>{settlementPeriodLast.year + 1}</option>
                            </>
                        )}
                    </select>
                </div>

                {!showNewRow && (
                    <button
                        onClick={() => setShowNewRow(true)}
                        className="w-40 bg-blue-900 font-semibold text-white px-4 py-1 rounded hover:bg-blue-700 text-sm cursor-pointer"
                        disabled={!selectedMonth || !selectedYear}
                    >
                        Crear novedad
                    </button>
                )}
            </div>

            <h2 className="text-base font-semibold text-gray-700 mb-2">{formatMonthYear()}</h2>

            {loading && <p className="text-center py-4">Cargando...</p>}
            {error && <p className="text-center text-red-500 py-4">{error || 'Error al cargar datos'}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs md:text-sm text-left">
                        <thead className="bg-gray-100 font-bold">
                            <tr>
                                <th className="p-2">ID</th>
                                <th className="p-2">Concepto</th>
                                <th className="p-2">Monto</th>
                                <th className="p-2">Cuota</th>
                                <th className="p-2">Total</th>
                                <th className="p-2 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {novelties?.data.results.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-4">No hay novedades</td>
                                </tr>
                            ) : (
                                novelties?.data.results.map((item, index) => (
                                    <NoveltyRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isEditing={editIndex === index}
                                        onEdit={handleEdit}
                                        onChange={handleChange}
                                        editData={editData ?? {}}
                                        onSave={handleSave}
                                        onCancel={resetEditState}
                                        onDisable={handleDisable}
                                    />
                                ))
                            )}

                            {showNewRow && (
                                <NoveltyNewRow
                                    newData={newData}
                                    onChange={(field, value) =>
                                        setNewData(prev => ({ ...prev, [field]: value }))
                                    }
                                    onCreate={() => handleCreate(newData)}
                                    onCancel={() => setShowNewRow(false)}
                                />
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded text-xs md:text-sm ${currentPage === i
                                        ? 'bg-blue-800 text-white'
                                        : 'bg-gray-600 text-white'
                                        }`}
                                    onClick={() => setCurrentPage(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default NoveltyDetailTable;
