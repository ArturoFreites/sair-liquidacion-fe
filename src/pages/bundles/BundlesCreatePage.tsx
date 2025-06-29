import { useEffect, useState, type FormEvent } from 'react';
import ButtonAction from '../../components/ButtonAction';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import Checkbox from '../../Checkbox';
import { useBankSearcher } from '../../hook/bank/useBank';
import { useCostCenterSearcher } from '../../hook/costCenter/useCostCenter';
import { useSocialReasonSearch } from '../../hook/socialReason/useSocialReasonSearch';
import { useFileCreate } from '../../hook/file/useFileCreate';
import type { CostCenter } from '../../types/models/CostCenter';
import type { Bank } from '../../types/models/Bank';
import type { SocialReason } from '../../types/models/SocialReason';
import type { FileRequest } from '../../types/request/FileRequest';
import { useErrorModalStore } from '../../store/errorModalStore';

function BundlesCreatePage() {

    const { showError } = useErrorModalStore.getState();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [cuit, setCuit] = useState('');
    const [cbu, setCbu] = useState('');
    const [birthday, setBirthday] = useState('');
    const [startDate, setStartDate] = useState('');
    const [workstation, setWorkstation] = useState('');
    const [accountingFile, setAccountingFile] = useState('');
    const [salaryFactor, setSalaryFactor] = useState('');
    const [settleCommissions, setSettleCommissions] = useState(false);
    const [razonSocialId, setRazonSocialId] = useState<number | null>(null);
    const [costCenterId, setCostCenterId] = useState<number | null>(null);
    const [bankId, setBankId] = useState<number | null>(null);
    const [salary, setSalary] = useState('');

    const { searchBanks, results: banks, loading: loadingBanks } = useBankSearcher();
    const { searchCostCenter, results: costCenter, loading: loadingCostCenter } = useCostCenterSearcher();
    const { searchSocialReasonSearch, results: socialReason, loading: loadingSocialReason } = useSocialReasonSearch();
    const { createFile, loading: creating, error } = useFileCreate();

    useEffect(() => {
        searchBanks('eq=status:active');
        searchCostCenter('eq=status:active');
        searchSocialReasonSearch('eq=status:active');
    }, []);

    const resetForm = () => {
        setName('');
        setLastName('');
        setDni('');
        setCuit('');
        setCbu('');
        setBirthday('');
        setStartDate('');
        setWorkstation('');
        setAccountingFile('');
        setSalaryFactor('');
        setSettleCommissions(false);
        setRazonSocialId(null);
        setCostCenterId(null);
        setBankId(null);
        setBankId(null);
        setSalary('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();               // <—— detiene el refresh del form

        // Detectar campos faltantes
        const missing: string[] = [];
        if (!name) missing.push('Nombre');
        if (!lastName) missing.push('Apellido');
        if (!dni) missing.push('DNI');
        if (!razonSocialId) missing.push('Razón social');
        if (!costCenterId) missing.push('Centro de costos');
        if (!bankId) missing.push('Banco');
        if (!salary) missing.push('Sueldo');

        if (missing.length) {
            showError(
                `Completá los siguientes campos obligatorios: ${missing.join(', ')}.`,
                'caution',
                false
            );
            return;
        }

        const payload: FileRequest = {
            name, lastName, dni, cuit,
            birthday: birthday ? new Date(birthday) : new Date,
            workstation, cbu,
            salaryFactor: salaryFactor ? parseFloat(salaryFactor) : 0,
            accountingFile: accountingFile,
            settleCommissions,
            socialReasonId: razonSocialId!,
            costCenterId: costCenterId!,
            bankId: bankId!,
            salary: salary ? parseFloat(salary) : 0
        };

        const { success } = await createFile(payload);
        if (success) {
            showError(
                'Legajo creado exitosamente',
                'ok',
                false
            );
            resetForm();
        } else {
            showError(
                error || 'Error al guardar el legajo',
                'caution',
                false
            );
        }
    };

    return (
        <form>
            <div className="m-6">
                <h1 className="text-2xl font-black">LEGAJOS</h1>
                <h2 className="text-xl font-medium">Alta</h2>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="Nombre *" placeHolder="Ingrese nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Apellido *" placeHolder="Ingrese apellido" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input label="DNI *" placeHolder="Ingrese DNI" type="number" value={dni} onChange={(e) => setDni(e.target.value)} />

                <Dropdown<SocialReason, number>
                    label="Razón Social *"
                    options={socialReason?.data.results || []}
                    value={razonSocialId}
                    onChange={setRazonSocialId}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder={loadingSocialReason ? "Cargando razón social..." : "Seleccione un razón social"}
                />

                <Dropdown<CostCenter, number>
                    label="Centro de Costos *"
                    options={costCenter?.data.results || []}
                    value={costCenterId}
                    onChange={setCostCenterId}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder={loadingCostCenter ? "Cargando centro de costos..." : "Seleccione un centro de costos"}
                />

                <Input label="Puesto" placeHolder="Ingrese puesto" type="text" value={workstation} onChange={(e) => setWorkstation(e.target.value)} />
                <Input label="Fecha de Nacimiento" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeHolder='' />
                <Input label="Fecha de Alta" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeHolder='' />
                <Input label="Cuit" placeHolder="Ingrese cuit" type="text" value={cuit} onChange={(e) => setCuit(e.target.value)} />
                <Input label="CBU" placeHolder="Ingrese CBU" type="text" value={cbu} onChange={(e) => setCbu(e.target.value)} />
                <Input label="Legajo Contable" placeHolder="Ingrese Legajo Contable" type="text" value={accountingFile} onChange={(e) => setAccountingFile(e.target.value)} />

                <Dropdown<Bank, number>
                    label="Banco *"
                    options={banks?.data.results || []}
                    value={bankId}
                    onChange={setBankId}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder={loadingBanks ? "Cargando bancos..." : "Seleccione banco"}
                />

                <Input
                    label="Factor Sueldo"
                    placeHolder="Ingrese factor sueldo"
                    type="number"
                    value={salaryFactor}
                    onChange={(e) => setSalaryFactor(e.target.value)}
                />

                <Input
                    label="Sueldo"
                    placeHolder="Ingrese sueldo"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />

                <div className="col-span-1 md:col-span-3">
                    <Checkbox option="Liquida comisiones" checked={settleCommissions} onChange={() => setSettleCommissions(!settleCommissions)} />
                </div>
            </div>

            <div className="flex w-full justify-center mt-24">
                <ButtonAction
                    name={creating ? "Guardando..." : "Guardar"}
                    onClick={handleSubmit}
                    type='submit'
                    className="font-semibold bg-blue-900 text-white hover:bg-blue-700"
                />
            </div>
        </form>
    );
}

export default BundlesCreatePage;
