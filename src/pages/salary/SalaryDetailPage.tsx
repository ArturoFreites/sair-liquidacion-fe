import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFileFind } from "../../hook/file/useFileFind";
import { useNoveltySalaryCreate } from "../../hook/novelty/useNoveltySalaryCreate";
import { useErrorModalStore } from "../../store/errorModalStore";
import PersonResume from "../../components/PersonResume";
import Skeleton from "react-loading-skeleton";
import Input from "../../components/Input";
import ButtonAction from "../../components/ButtonAction";
import SalaryHistory from "../../components/salary/SalaryHistory";
import { formatCurrency, formatPeriod } from "../../utils/format";
import { Dropdown } from "../../components/Dropdown";
import type { SettlementPeriod } from "../../types/models/SettlementPeriod";
import { useSettlementPeriodSearch } from "../../hook/settlementPeriod/useSettlementPeriodSearch";
import { useNoveltySearch } from "../../hook/novelty/useNoveltySearch";

function SalaryDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [salary, setSalary] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const { searchNovelty, results: lastSalary, loading: lastSalaryLoading } = useNoveltySearch();
    const { searchSettlementPeriod, results: settlementPeriods, loading: settlementPeriodLoading } = useSettlementPeriodSearch();
    const { findFile, result: file, loading: loadingFile } = useFileFind();
    const { createNoveltySalary, loading: saving, error: backendError } = useNoveltySalaryCreate();
    const { showError } = useErrorModalStore.getState();

    const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);

    const lastNovelty = lastSalary?.data?.results?.[0];
    const currentSalaryValue = lastNovelty?.value ?? 0;

    useEffect(() => {
        searchNovelty(`eq=status:active&eq=file.id:${id}&eq=concept.name:Sueldo&sort=settlementPeriod.year:desc,settlementPeriod.month:desc&page=0&size=1`);
        if (id) findFile(id);
        searchSettlementPeriod("eq=status:active");
    }, [id]);

    const handleSubmit = async () => {
        const parsedSalary = parseFloat(salary);
        if (!parsedSalary || parsedSalary <= 0) {
            showError("El sueldo debe ser un número mayor a 0.", "caution");
            return;
        }

        if (!id || isNaN(Number(id))) {
            showError("ID de legajo inválido.", "caution");
            return;
        }

        if (selectedPeriodId == null) {
            showError("Debes seleccionar al menos un período.", "caution");
            return;
        }

        setFormError(null);

        const result = await createNoveltySalary({
            fileId: Number(id),
            salary: parsedSalary,
            settlementPeriodId: selectedPeriodId,
        });

        if (result.success) {
            showError("Sueldo actualizado correctamente", "ok", false);
            setSalary("");
            setSelectedPeriodId(null);
            setReloadKey(prev => prev + 1);
            await searchNovelty(`eq=status:active&eq=file.id:${id}&eq=concept.name:Sueldo&sort=settlementPeriod.year:desc,settlementPeriod.month:desc&page=0&size=1`);
        } else {
            showError(backendError || "Error al actualizar el sueldo", "caution", false);
        }
    }


    return (
        <section className="mb-10 md:mb-0">
            <div className="m-6">
                <h1 className="font-black text-2xl">SUELDOS</h1>
                <h2 className="font-medium text-xl">Detalle</h2>
            </div>

            <article>
                {loadingFile ? <Skeleton /> : <PersonResume file={file} />}
            </article>

            <div className="m-6">
                <p className="font-semibold text-lg mt-2">Sueldo Actual</p>
                {
                    lastSalaryLoading ? <p>Cargando..</p> :
                        <p>{formatCurrency(currentSalaryValue)}</p>
                }

            </div>

            <article className="md:flex w-full md:mx-6">
                <div className="flex flex-col items-center md:items-baseline w-full md:w-4/12">
                    <h3 className="font-semibold text-sm mt-6 md:pt-3">Actualizar Sueldo</h3>

                    {/* Dropdown para agregar período */}
                    <div className="flex flex-col gap-2 mb-4 w-full md:items-baseline justify-center items-center">
                        <Dropdown<SettlementPeriod, number>
                            label="Período"
                            options={settlementPeriods?.data.results || []}
                            value={selectedPeriodId}
                            onChange={setSelectedPeriodId}
                            getOptionLabel={(o) => formatPeriod(o.month, o.year)}
                            getOptionValue={(o) => o.id}
                            placeholder={settlementPeriodLoading ? "Cargando períodos..." : "Seleccione un período"}
                            className="mx-0 w-fit md:w-8/12"
                        />
                    </div>
                    <Input
                        type="number"
                        label="Sueldo"
                        placeHolder="Ingrese Nuevo Sueldo"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <ButtonAction
                        name={saving ? "Guardando..." : "Aceptar Cambios"}
                        type="submit"
                        onClick={handleSubmit}
                        className="font-semibold bg-blue-900 text-white hover:bg-blue-700 mt-2"
                    />

                    {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
                    {backendError && <p className="text-red-500 text-sm mt-1">{backendError}</p>}
                </div>

                {id && <SalaryHistory fileId={id} key={reloadKey} />}
            </article>
        </section>
    );
}

export default SalaryDetailPage;
