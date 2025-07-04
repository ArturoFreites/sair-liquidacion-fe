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

function SalaryDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [active, setActive] = useState(false);
    const [salary, setSalary] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const { findFile, result: file, loading: loadingFile } = useFileFind();
    const { createNoveltySalary, loading: saving, error: backendError } = useNoveltySalaryCreate();
    const { showError } = useErrorModalStore.getState();

    useEffect(() => {
        if (id) findFile(id);
    }, [id]);

    const handleSubmit = async () => {
        const parsedSalary = parseFloat(salary);
        if (!parsedSalary || parsedSalary <= 0) {
            showError("El sueldo debe ser un número mayor a 0.","caution");
            return;
        }

        if (!id || isNaN(Number(id))) {
            showError("ID de legajo inválido.","caution");
            return;
        }

        setFormError(null);

        const result = await createNoveltySalary({
            fileId: Number(id),
            salary: parsedSalary,
        });

        if (result.success) {
            showError("Sueldo actualizado correctamente", "ok", false);
            setSalary("");
            setActive(false);
            setReloadKey((prev) => prev + 1);
        } else {
            showError(backendError || "Error al actualizar el sueldo", "caution", false);
        }
    };

    return (
        <section className="mb-10 md:mb-0">
            <div className="m-6">
                <h1 className="font-black text-2xl">SUELDOS</h1>
                <h2 className="font-medium text-xl">Detalle</h2>
            </div>

            <article>
                {loadingFile ? <Skeleton /> : <PersonResume file={file} />}
            </article>

            <article className="mx-6 mt-10">
                <div className="md:items-baseline w-full flex flex-col items-center md:w-2/6">
                    <h3
                        onClick={() => setActive(!active)}
                        className="bg-indigo-400 w-fit rounded-md p-2 text-sm text-white font-semibold mb-6 md:mb-2 cursor-pointer hover:bg-indigo-500 md:mr-10"
                    >
                        Actualizar Sueldo
                    </h3>

                    {active && (
                        <div className="flex flex-col items-center md:items-baseline w-full">
                            <Input
                                type="number"
                                label="Sueldo"
                                placeHolder="Actualizar Sueldo"
                                className="xl:my-0 xl:mx-0 md:py-6"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            <ButtonAction
                                name={saving ? "Guardando..." : "Aceptar Cambios"}
                                type="submit"
                                onClick={handleSubmit}
                                className="font-semibold bg-blue-900 text-white hover:bg-blue-700 m-0"
                            />
                            {formError && (
                                <p className="text-red-500 text-sm mt-2">{formError}</p>
                            )}
                            {backendError && (
                                <p className="text-red-500 text-sm mt-1">{backendError}</p>
                            )}
                        </div>
                    )}
                </div>

                {id && <SalaryHistory fileId={id} key={reloadKey} />}
            </article>
        </section>
    );
}

export default SalaryDetailPage;
