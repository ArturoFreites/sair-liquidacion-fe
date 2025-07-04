import { useEffect } from "react";
import { useFileFind } from "../../hook/file/useFileFind";
import Skeleton from "react-loading-skeleton";
import PersonResume from "../../components/PersonResume";
import NoveltyDetailTable from "../../components/novelty/NoveltyDetailTable";
import { useParams } from "react-router-dom";

function NoveltyDetailPage() {
    const { id } = useParams<{ id: string }>();

    /* ------------ hooks de búsqueda ------------ */
    const { findFile, result: file, loading: loadingFile } = useFileFind();

    useEffect(() => {
        if (id) findFile(id);
    }, [id]);

    return (
        <section className="mb-10 md:mb-0">
            <div className="m-6">
                <h1 className="font-black text-2xl">NOVEDADES</h1>
                <h2 className="font-medium text-xl">Detalles</h2>
            </div>
            <article>
                <div>
                    <article>
                        {loadingFile ? <Skeleton height={60} className="m-6 "/> : <PersonResume file={file} />}
                    </article>
                </div>
                <div className="flex w-full">
                    <NoveltyDetailTable />
                </div>
            </article>
        </section>
    );
}

export default NoveltyDetailPage;
