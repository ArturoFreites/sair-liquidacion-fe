/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import type { NoveltyRequest } from '../../types/request/NoveltyRequest';
import { useConceptSearch } from '../../hook/concepts/useConceptSearch';

interface Props {
    newData: Partial<NoveltyRequest>;
    onChange: (field: keyof NoveltyRequest, value: any) => void;
    onCreate: () => void;
    onCancel: () => void;
}

export default function NoveltyNewRow({ newData, onChange, onCreate, onCancel }: Props) {
    const { searchConcept, results } = useConceptSearch();

    useEffect(() => {
        searchConcept(`neq=name:Sueldo&eq=status:active`); // Carga inicial
    }, []);

    return (
        <tr className="bg-gray-50">
            <td className="p-2 text-gray-500">Nuevo</td>

            <td className="p-2">
                <select
                    className="border border-neutral-200 px-2 py-1 rounded-md w-40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newData.conceptId ?? ''}
                    onChange={(e) => onChange('conceptId', Number(e.target.value))}
                >
                    <option value="">Seleccionar...</option>
                    {results?.data.results.map((concept) => (
                        <option key={concept.id} value={concept.id}>
                            {concept.name}
                        </option>
                    ))}
                </select>

            </td>

            <td className="p-2">
                <input
                    type="number"
                    className="border border-neutral-200 px-2 py-1 rounded-md w-36"
                    value={newData.value ?? ''}
                    onChange={(e) => onChange('value', Number(e.target.value))}
                />
            </td>

            <td className="p-2">
                <input
                    type="number"
                    className="border border-neutral-200 px-2 py-1 rounded-md w-36"
                    value={newData.quota ?? ''}
                    onChange={(e) => onChange('quota', Number(e.target.value))}
                />
            </td>

            <td className="p-2">
                <input
                    type="number"
                    className="border border-neutral-200 px-2 py-1 rounded-md w-36"
                    value={newData.totalQuota ?? ''}
                    onChange={(e) => onChange('totalQuota', Number(e.target.value))}
                />
            </td>

            <td className="p-2 text-center space-x-2">
                <button
                    onClick={onCreate}
                    className="text-green-700 hover:text-green-900"
                    title="Crear novedad"
                >
                    <Plus size={18} />
                </button>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-red-600"
                    title="Cancelar"
                >
                    <X size={18} />
                </button>
            </td>
        </tr>
    );
}
