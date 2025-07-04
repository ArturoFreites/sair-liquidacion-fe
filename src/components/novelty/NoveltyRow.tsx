/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pencil, Trash, Save, X } from 'lucide-react';
import type { Novelty } from '../../types/models/Novelty';
import type { NoveltyRequest } from '../../types/request/NoveltyRequest';

interface Props {
    item: Novelty;
    index: number;
    isEditing: boolean;
    onEdit: (index: number, data: NoveltyRequest) => void;
    onChange: (field: keyof NoveltyRequest, value: any) => void;
    onSave: (id: number) => void;
    onCancel: () => void;
    onDisable: (id: number) => void;
    editData: Partial<NoveltyRequest>;
}

export default function NoveltyRow({
    item,
    index,
    isEditing,
    onEdit,
    onChange,
    onSave,
    onCancel,
    onDisable,
    editData
}: Props) {
    const formatCurrency = (value: number) => `$ ${value.toLocaleString('es-AR')}`;

    return (
        <tr key={item.id} className="border-b border-neutral-200">
            <td className="p-2">{item.id}</td>
            <td className="p-2">
                {isEditing ? (
                    <input
                        type="number"
                        className="border px-1"
                        value={editData.conceptId ?? ''}
                        onChange={e => onChange('conceptId', Number(e.target.value))}
                    />
                ) : `${item.concept.id} - ${item.concept.name}`}
            </td>
            <td className="p-2">
                {isEditing ? (
                    <input
                        type="number"
                        className="border px-1"
                        value={editData.value ?? ''}
                        onChange={e => onChange('value', Number(e.target.value))}
                    />
                ) :
                    <p className={item.concept.impact === 'Negativo' ? 'text-red-600 font-medium' : ''}>
                        {formatCurrency(item.value)}
                    </p>
                }
            </td>
            <td className="p-2">
                {isEditing ? (
                    <input
                        type="number"
                        className="border px-1"
                        value={editData.quota ?? ''}
                        onChange={e => onChange('quota', Number(e.target.value))}
                    />
                ) : item.quota}
            </td>
            <td className="p-2">
                {isEditing ? (
                    <input
                        type="number"
                        className="border px-1"
                        value={editData.totalQuota ?? ''}
                        onChange={e => onChange('totalQuota', Number(e.target.value))}
                    />
                ) : item.totalQuota}
            </td>
            <td className="p-2 text-center space-x-2">
                {isEditing ? (
                    <>
                        <button onClick={() => onSave(Number(item.id))} className="text-green-600 hover:text-green-800">
                            <Save size={16} />
                        </button>
                        <button onClick={onCancel} className="text-gray-600 hover:text-gray-800">
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                onEdit(index, {
                                    id: String(item.id),
                                    conceptId: item.concept.id,
                                    fileId: item.file.id,
                                    settlementPeriodId: item.settlementPeriod.id,
                                    value: item.value,
                                    quota: item.quota,
                                    totalQuota: item.totalQuota,
                                    origin: item.origin
                                })
                            }
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={() => onDisable(Number(item.id))}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash size={16} />
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}
