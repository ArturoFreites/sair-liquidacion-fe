import { useEffect, useState } from 'react';
import type {FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import Checkbox from '../../Checkbox';
import ButtonAction from '../../components/ButtonAction';

import { useBankSearcher } from '../../hook/bank/useBank';
import { useCostCenterSearcher } from '../../hook/costCenter/useCostCenter';
import { useSocialReasonSearch } from '../../hook/socialReason/useSocialReasonSearch';
import { useFileFind } from '../../hook/file/useFileFind';

import type { Bank } from '../../types/models/Bank';
import type { CostCenter } from '../../types/models/CostCenter';
import type { SocialReason } from '../../types/models/SocialReason';
import type { FileRequest } from '../../types/request/FileRequest';
import { useErrorModalStore } from '../../store/errorModalStore';
import { useFileUpdate } from '../../hook/file/useFileUpdate';

function BundlesUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showError } = useErrorModalStore.getState();

    const toISODate = (s?: string | null) => s ? s.split(' ')[0] : '';

    /* ------------ hooks de búsqueda ------------ */
    const { findFile, result: file, loading: loadingFile } = useFileFind();
    const { updateFile, loading: saving, error: errorSave } = useFileUpdate();

    const { searchBanks, results: banks, loading: loadingBanks } = useBankSearcher();
    const { searchCostCenter, results: costCenters, loading: loadingCostCenters } = useCostCenterSearcher();
    const { searchSocialReasonSearch, results: socialReasons, loading: loadingSocialReasons } = useSocialReasonSearch();

    /* ------------ estado local ------------ */
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [cuit, setCuit] = useState('');
    const [cbu, setCbu] = useState('');
    const [birthday, setBirthday] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [workstation, setWorkstation] = useState('');
    const [accountingFile, setAccountingFile] = useState('');
    const [salaryFactor, setSalaryFactor] = useState('');
    const [settleCommissions, setSettleCommissions] = useState(false);
    const [razonSocialId, setRazonSocialId] = useState<number | null>(null);
    const [costCenterId, setCostCenterId] = useState<number | null>(null);
    const [bankId, setBankId] = useState<number | null>(null);

    /* ------------ carga inicial ------------ */
    useEffect(() => {
        if (id) findFile(id);
        searchBanks('eq=status:active');
        searchCostCenter('eq=status:active');
        searchSocialReasonSearch('eq=status:active');
    }, [id]);

    /* ------------ hidratar estados cuando llega el legajo ------------ */
    useEffect(() => {
        if (!file) return;
        setName(file.person.name);
        setLastName(file.person.lastName);
        setDni(file.person.dni);
        setCuit(file.person.cuit ?? '');
        setCbu(file.cbu ?? '');
        setBirthday(toISODate(file.person.birthday));
        setStartDate(toISODate(file.createdAt));
        setEndDate(toISODate(''));
        setWorkstation(file.workstation ?? '');
        setAccountingFile(file.accountingFile ?? '');
        setSalaryFactor(String(file.salaryFactor ?? ''));
        setSettleCommissions(Boolean(file.settleCommissions));
        setRazonSocialId(file.socialReason.id);
        setCostCenterId(file.costCenter.id);
        setBankId(file.bank.id);
    }, [file]);

    /* ------------ submit ------------ */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const missing: string[] = [];
        if (!name) missing.push('Nombre');
        if (!lastName) missing.push('Apellido');
        if (!dni) missing.push('DNI');
        if (!razonSocialId) missing.push('Razón social');
        if (!costCenterId) missing.push('Centro de costos');
        if (!bankId) missing.push('Banco');

        if (missing.length) {
            showError(`Completá los campos: ${missing.join(', ')}.`, 'caution', false);
            return;
        }

        const payload: FileRequest = {
            id, name, lastName, dni, cuit,
            birthday: birthday ? new Date(birthday) : undefined,
            workstation, cbu,
            salaryFactor: salaryFactor ? parseFloat(salaryFactor) : undefined,
            accountingFile,
            settleCommissions,
            socialReasonId: razonSocialId!,
            costCenterId: costCenterId!,
            bankId: bankId!
        };

        const { success } = await updateFile(payload);
        if (success) {
            showError('Legajo actualizado correctamente', 'ok', false);
            navigate(-1); // volver a la lista
        } else {
            showError(errorSave || 'Error al actualizar el legajo', 'caution', false);
        }
    };

    if (loadingFile) {
        return <p className="p-6">Cargando legajo...</p>;
    }

    if (!file) {
        return <p className="p-6 text-red-600">No se encontró el legajo</p>;
    }

    /* ------------ UI ------------ */
    return (
        <form onSubmit={handleSubmit}>
            <div className="m-6">
                <h1 className="text-2xl font-black">LEGAJOS</h1>
                <h2 className="text-xl font-medium">Actualización</h2>
            </div>

            <div className="mx-6">
                <h2 className="bg-blue-900 w-fit rounded-md p-2 text-sm text-white font-semibold">
                    Legajo #{file.id}
                </h2>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="Nombre *" type="text" value={name} onChange={e => setName(e.target.value)} placeHolder='Ingrese Nombre' />
                <Input label="Apellido *" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeHolder='Ingrese Apellido' />
                <Input label="DNI *" type="number" value={dni} onChange={e => setDni(e.target.value)} placeHolder='Ingrese DNI' />

                <Dropdown<SocialReason, number>
                    label="Razón Social *"
                    options={socialReasons?.data.results || []}
                    value={razonSocialId}
                    onChange={setRazonSocialId}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.id}
                    placeholder={loadingSocialReasons ? 'Cargando...' : 'Seleccione razón social'}
                />

                <Dropdown<CostCenter, number>
                    label="Centro de Costos *"
                    options={costCenters?.data.results || []}
                    value={costCenterId}
                    onChange={setCostCenterId}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.id}
                    placeholder={loadingCostCenters ? 'Cargando...' : 'Seleccione centro de costos'}
                />

                <Input label="Puesto" type="text" value={workstation} onChange={e => setWorkstation(e.target.value)}  placeHolder=''/>
                <Input label="Fecha de Nacimiento" type="date" value={birthday} onChange={e => setBirthday(e.target.value)}  placeHolder='' />
                <Input label="Fecha de Alta" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}  placeHolder='' />
                <Input label="Cuit" type="text" value={cuit} onChange={e => setCuit(e.target.value)}  placeHolder='' />
                <Input label="CBU" type="text" value={cbu} onChange={e => setCbu(e.target.value)}  placeHolder='' />
                <Input label="Legajo Contable" type="text" value={accountingFile} onChange={e => setAccountingFile(e.target.value)}  placeHolder='' />

                <Dropdown<Bank, number>
                    label="Banco *"
                    options={banks?.data.results || []}
                    value={bankId}
                    onChange={setBankId}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.id}
                    placeholder={loadingBanks ? 'Cargando...' : 'Seleccione banco'}
                />

                <Input
                    label="Factor Sueldo"
                    type="number"
                    value={salaryFactor}
                    onChange={e => setSalaryFactor(e.target.value)}
                    placeHolder='Ingrese Factor Sueldo'
                />

                <Input label="Fecha de Baja" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}  placeHolder='' />

                <div className="col-span-1 md:col-span-3">
                    <Checkbox
                        option="Liquida comisiones"
                        checked={settleCommissions}
                        onChange={() => setSettleCommissions(!settleCommissions)}
                    />
                </div>
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

export default BundlesUpdatePage;
