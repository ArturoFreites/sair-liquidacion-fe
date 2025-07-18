import { useState, type FormEvent } from 'react';
import ButtonAction from '../../components/ButtonAction';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import { useErrorModalStore } from '../../store/errorModalStore';
import type { DropdownValue } from '../../types/models/DropdownValue';
import { FRECUENCIA, IMPACTO, MEDIO_LIQUIDACION, TIPO } from '../../services/dropdown';
import type { ConceptRequest } from '../../types/request/ConceptRequest';
import { useConceptCreate } from '../../hook/concepts/useConceptCreate';

function ConceptCreatePage() {
    const { showError } = useErrorModalStore.getState();

    const [name, setName] = useState('');
    const [impact, setImpact] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [frequency, setFrequency] = useState('');
    const [paymentType, setPaymentType] = useState('');

    const { createConcept, loading: creating, error } = useConceptCreate();

    const resetForm = () => {
        setName('');
        setImpact('');
        setTypeValue('');
        setFrequency('');
        setPaymentType('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const missing: string[] = [];
        if (!name) missing.push('Nombre');
        if (!impact) missing.push('Impacto');
        if (!typeValue) missing.push('Tipo de valor');
        if (!frequency) missing.push('Frecuencia');

        if (missing.length) {
            showError(`Completá los siguientes campos obligatorios: ${missing.join(', ')}.`, 'caution', false);
            return;
        }

        const payload: ConceptRequest = {
            id:1,
            name,
            impact,
            typeValue,
            frequency,
            paymentType,
            status:""
        };

        const { success } = await createConcept(payload);
        if (success) {
            showError('Concepto creado exitosamente', 'ok', false);
            resetForm();
        } else {
            showError(error || 'Error al guardar el concepto', 'caution', false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="m-6">
                <h1 className="text-2xl font-black">CONCEPTOS</h1>
                <h2 className="text-xl font-medium">Creación</h2>
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

            <div className="flex w-full justify-center mt-24">
                <ButtonAction
                    name={creating ? 'Guardando...' : 'Guardar'}
                    type="submit"
                    className="font-semibold bg-blue-900 text-white hover:bg-blue-700"
                />
            </div>
        </form>
    );
}

export default ConceptCreatePage;
