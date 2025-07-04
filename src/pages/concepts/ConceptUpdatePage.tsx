import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import Checkbox from '../../Checkbox';
import ButtonAction from '../../components/ButtonAction';
import { useErrorModalStore } from '../../store/errorModalStore';
import { useConceptFind } from '../../hook/concepts/useConceptFind';
import { useConceptUpdate } from '../../hook/concepts/useConceptUpdate';
import type { ConceptRequest } from '../../types/request/ConceptRequest';
import type { DropdownValue } from '../../types/models/DropdownValue';
import { FRECUENCIA, IMPACTO, MEDIO_LIQUIDACION, TIPO } from '../../services/dropdown';

function ConceptUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showError } = useErrorModalStore.getState();

    const { findConcept, result: concept, loading: loadingFile } = useConceptFind();
    const { updateConcept, loading: saving, error: errorSave } = useConceptUpdate();

    const [name, setName] = useState('');
    const [impact, setImpact] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [frequency, setFrequency] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    useEffect(() => {
        if (id) findConcept(id);
    }, [id]);

    useEffect(() => {
        if (!concept) return;
        setName(concept.name);
        setImpact(concept.impact);
        setTypeValue(concept.typeValue);
        setFrequency(concept.frequency ?? '');
        setPaymentType(concept.paymentType);
        setStatus(concept.status || 'active');
    }, [concept]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const missing: string[] = [];
        if (!name) missing.push('Nombre');
        if (!impact) missing.push('Impacto');
        if (!typeValue) missing.push('Tipo de valor');
        if (!frequency) missing.push('Frecuencia');

        if (missing.length) {
            showError(`Completá los campos: ${missing.join(', ')}.`, 'caution', false);
            return;
        }

        const payload: ConceptRequest = {
            id,
            name,
            impact,
            typeValue,
            frequency,
            paymentType,
            status
        };

        const { success } = await updateConcept(payload);
        if (success) {
            showError('Concepto actualizado correctamente', 'ok', false);
            navigate(-1);
        } else {
            showError(errorSave || 'Error al actualizar el concepto', 'caution', false);
        }
    };

    if (loadingFile) return <p className="p-6">Cargando Concepto...</p>;
    if (!concept) return <p className="p-6 text-red-600">No se encontró el Concepto</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="m-6">
                <h1 className="text-2xl font-black">CONCEPTOS</h1>
                <h2 className="text-xl font-medium">Actualización</h2>
            </div>

            <div className="mx-6">
                <h2 className="bg-blue-900 w-fit rounded-md p-2 text-sm text-white font-semibold">
                    Concepto - {concept.name}
                </h2>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    label="Nombre *"
                    placeHolder="Ingrese nombre"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Dropdown<DropdownValue, string>
                    label="Impacto *"
                    options={IMPACTO}
                    value={impact}
                    onChange={setImpact}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.name}
                    placeholder="Seleccione un impacto"
                />

                <Dropdown<DropdownValue, string>
                    label="Tipo de valor *"
                    options={TIPO}
                    value={typeValue}
                    onChange={setTypeValue}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.name}
                    placeholder="Seleccione un tipo"
                />

                <Dropdown<DropdownValue, string>
                    label="Frecuencia *"
                    options={FRECUENCIA}
                    value={frequency}
                    onChange={setFrequency}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.name}
                    placeholder="Seleccione una frecuencia"
                />

                <Dropdown<DropdownValue, string>
                    label="Tipo de pago *"
                    options={MEDIO_LIQUIDACION}
                    value={paymentType}
                    onChange={setPaymentType}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.name}
                    placeholder="Seleccione un tipo de pago"
                />
            </div>

            <div className="col-span-1 md:col-span-3 px-6">
                <Checkbox
                    option="Desactivar concepto"
                    checked={status === 'inactive'}
                    onChange={() => setStatus(status === 'active' ? 'inactive' : 'active')}
                />
            </div>

            <div className="flex w-full justify-center mt-24">
                <ButtonAction
                    name={saving ? 'Guardando...' : 'Guardar cambios'}
                    type="submit"
                    className="font-semibold bg-blue-900 text-white hover:bg-blue-700"
                />
            </div>
        </form>
    );
}

export default ConceptUpdatePage;
