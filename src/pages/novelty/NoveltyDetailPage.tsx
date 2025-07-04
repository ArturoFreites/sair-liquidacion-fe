import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useErrorModalStore } from "../../store/errorModalStore";
import { useFileFind } from "../../hook/file/useFileFind";
import Skeleton from "react-loading-skeleton";
import PersonResume from "../../components/PersonResume";
import NoveltyDetailTable from "../../components/novelty/NoveltyDetailTable";
import { useSettlementPeriodSearch } from "../../hook/settlementPeriod/useSettlementPeriodSearch";
import SearcherIcon from "../../components/icons/SearcherIcon";

function NoveltyDetailPage() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showError } = useErrorModalStore.getState();
    /* ------------ hooks de búsqueda ------------ */
    const { findFile, result: file, loading: loadingFile } = useFileFind();
    const { searchSettlementPeriod, results: settlementPeriods, loading: settlementPeriodLoading } = useSettlementPeriodSearch();

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const formatMonthYear = (year: number, month: number) => {
        const date = new Date(year, month - 1);
        return `${capitalize(date.toLocaleDateString('es-AR', { month: 'long' }))} ${date.getFullYear()}`;
    };

    useEffect(() => {
        searchSettlementPeriod("");
        if (id) findFile(id);
    }, [id]);

    return (

        <section className="mb-10 md:mb-0">
            <div className='m-6'>
                <h1 className='font-black text-2xl'>
                    NOVEDADES
                </h1>
                <h2 className='font-medium text-xl'>Detalles</h2>
            </div>
            <article>
                <div>
                    <article>
                        {loadingFile ? <Skeleton /> : <PersonResume file={file} />}
                    </article>
                </div>
                <div className="flex w-full">
                    <NoveltyDetailTable />
                    <div>

                        <div className="flex justify-center items-center mx-4
                        bg-neutral-200 rounded-md h-9 p-4
                        ">
                            <SearcherIcon width={15} height={15} />
                            <input placeholder="Ingrese parametro de busqueda" type="text"
                                className="h-9 px-4 py-2 text-sm"
                            />
                        </div>
                        <table className="text-xs md:text-sm text-left md:w-1/3">
                            <thead className="bg-gray-100 font-bold">
                                <tr>
                                    <th className="p-2">Periodo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    settlementPeriods?.data.results.map((item, index) => (
                                        <td className="px-2 py-1">{formatMonthYear(item.year, item.month)}</td>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>

        </section>

    );
}

export default NoveltyDetailPage;