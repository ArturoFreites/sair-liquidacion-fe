import { useEffect, useState } from "react";
import { useNoveltySearch } from "../../hook/novelty/useNoveltySearch";
import { formatPeriod } from "../../utils/format";

type Props = {
    fileId: string;
};

function SalaryHistory({ fileId }: Props) {
    const [page, setPage] = useState(0);
    const { searchNovelty, results: noveltyResponse, loading } = useNoveltySearch();

    useEffect(() => {
        const filters = [`size=5`, `sort=createdAt:desc&eq=file.id:${fileId}`];
        searchNovelty(filters.join("&"), page);
    }, [page]);

    const novelties = noveltyResponse?.data?.results || [];
    const totalPages = noveltyResponse?.data?.totalPages ?? 0;

    const formatCurrency = (value: number) => {
        return value.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        });
    };

    const windowSize = 5;
    const windowStart = Math.floor(page / windowSize) * windowSize;
    const windowEnd = Math.min(windowStart + windowSize - 1, totalPages - 1);
    const pageNumbers = Array.from(
        { length: windowEnd - windowStart + 1 },
        (_, i) => windowStart + i
    );

    return (
        <div className="w-full flex flex-col items-center justify-center md:w-8/12 md:items-baseline md:pr-12">
            <h3 className="pb-2 md:pl-6 text-sm text-neutral-900 font-semibold mt-6 md:mt-0 md:mb-2">
                Historial
            </h3>

            <div className="w-full px-6">
                <div className="flex w-full justify-between bg-neutral-200 px-4 py-2 rounded-md text-sm font-semibold">
                    <p>Monto</p>
                    <p>Periodo</p>
                </div>

                {loading ? (
                    <p className="mt-4 text-center text-gray-500">Cargando...</p>
                ) : novelties.length === 0 ? (
                    <p className="mt-4 text-center text-gray-500">No hay histórico de sueldos</p>
                ) : (
                    <>
                        <div className="divide-y border-b border-neutral-200">
                            {novelties.map((n) => (
                                <div
                                    key={n.id}
                                    className="flex justify-between px-4 py-2 text-xs md:text-sm"
                                >
                                    <span>{formatCurrency(n.value)}</span>
                                    <span className="capitalize">
                                        {n.settlementPeriod
                                            ? formatPeriod(
                                                n.settlementPeriod.month,
                                                n.settlementPeriod.year
                                            )
                                            : "Sin periodo"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        <div className="flex items-center justify-center gap-1 mt-4">
                            {page > 0 && (
                                <button
                                    onClick={() => setPage(page - 1)}
                                    className="cursor-pointer px-2 py-1 text-sm rounded hover:text-neutral-600"
                                >
                                    Anterior
                                </button>
                            )}

                            {pageNumbers.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 text-sm rounded ${p === page
                                            ? "font-semibold bg-blue-900 text-white cursor-pointer"
                                            : "hover:bg-gray-200"
                                        }`}
                                >
                                    {p + 1}
                                </button>
                            ))}

                            {page < totalPages - 1 && (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    className="cursor-pointer px-2 py-1 text-sm rounded hover:text-neutral-600"
                                >
                                    Siguiente
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SalaryHistory;
