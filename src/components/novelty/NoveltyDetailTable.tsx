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

type Props = {
    selectedPeriodId: number | null;
};

function NoveltyDetailTable({ selectedPeriodId }: Props) {

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
        if (!id) return;
        const baseFilter = `eq=file.id:${id}`;
        const periodFilter = selectedPeriodId ? `;eq=settlementPeriod.id:${selectedPeriodId}` : '';
        searchNovelty(`${baseFilter}${periodFilter}`, currentPage);
        findSettlementPeriodLast();
    }, [currentPage, id, selectedPeriodId]);

    useEffect(() => {
        const periodId = Number(selectedPeriodId ?? settlementPeriodLast?.id ?? 0);
        setNewData(prev => ({ ...prev, settlementPeriodId: periodId }));
    }, [settlementPeriodLast, selectedPeriodId]);


    const handleSave = async (noveltyId: number) => {
        if (!editData) return;
        const payload: NoveltyRequest = { ...editData, id: String(noveltyId) };
        const { success } = await updateNovelty(payload);
        if (success) {
            resetEditState();
            searchNovelty(`eq=file.id:${id}`, currentPage);
        }
    };

    const handleDisable = async (noveltyId: number) => {
        const { success } = await disableNovelty(noveltyId);
        if (success) {
            searchNovelty(`eq=file.id:${id}`, currentPage);
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
            searchNovelty(`eq=file.id:${id}`, currentPage);
        }
    };

    const resetEditState = () => {
        setEditIndex(null);
        setEditData(null);
    };

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const activePeriod = selectedPeriodId
        ? novelties?.data.results[0]?.settlementPeriod
        : settlementPeriodLast;

    const formatMonthYear = () => {
        if (!activePeriod) return 'Período no disponible';
        const date = new Date(activePeriod.year, activePeriod.month - 1);
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
        <div className="p-4 bg-white md:w-2/3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="rounded-md text-base font-semibold bg-blue-900 text-white px-4 py-1 w-fit">
                    {formatMonthYear()}
                </h2>
                {!showNewRow && (
                    <button
                        onClick={() => setShowNewRow(true)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                        disabled={!activePeriod}
                    >
                        Crear novedad
                    </button>
                )}
            </div>

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
