import { useState, type FormEvent } from 'react';
import ButtonAction from '../../components/ButtonAction';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import { useErrorModalStore } from '../../store/errorModalStore';
import type { DropdownValue } from '../../types/models/DropdownValue';
import { TIPO_PERIODO } from '../../services/dropdown';
import type { SettlementPeriodRequest } from '../../types/request/SettlementPeriodRequest';
import { useSettlementPeriodCreate } from '../../hook/settlementPeriod/useSettlementPeriodCreate';

function SettlementPeriodCreatePage() {
    const { showError } = useErrorModalStore.getState();

    const [month, setMonth] = useState('1');
    const [year, setYear] = useState('2025');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');

    const { createSettlementPeriod, loading: creating, error } = useSettlementPeriodCreate();

    const resetForm = () => {
        setMonth('1');
        setYear('2025');
        setStartDate('');
        setEndDate('');
        setType('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const missing: string[] = [];
        if (!month) missing.push('Mes');
        if (!year) missing.push('Año');
        if (!startDate) missing.push('Fecha de Inicio');
        if (!endDate) missing.push('Fecha de Finalización');
        if (!type) missing.push('Tipo');

        if (missing.length) {
            showError(`Completá los siguientes campos obligatorios: ${missing.join(', ')}.`, 'caution', false);
            return;
        }

        const payload: SettlementPeriodRequest = {
            month: Number(month),
            year: Number(year),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            type,
        };

        const { success } = await createSettlementPeriod(payload);
        if (success) {
            showError('Periodo creado exitosamente', 'ok', false);
            resetForm();
        } else {
            showError(error || 'Error al guardar el periodo', 'caution', false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="m-6">
                <h1 className="text-2xl font-black">PERIODO</h1>
                <h2 className="text-xl font-medium">Creación</h2>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                <Input
                    label="Mes *"
                    placeHolder="Ingrese mes"
                    type="number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />

                <Input
                    label="Año *"
                    placeHolder="Ingrese año"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <Input
                    label="Fecha de Inicio"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeHolder=""
                />

                <Input
                    label="Fecha de Finalización"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeHolder=""
                />

                <Dropdown<DropdownValue, string>
                    label="Tipo *"
                    options={TIPO_PERIODO}
                    value={type}
                    onChange={setType}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.name}
                    placeholder="Seleccione tipo"
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

export default SettlementPeriodCreatePage;
