import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useErrorModalStore } from "../../store/errorModalStore";
import { useFileFind } from "../../hook/file/useFileFind";

function NoveltyDetailPage() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showError } = useErrorModalStore.getState();
    /* ------------ hooks de búsqueda ------------ */
    const { findFile, result: file, loading: loadingFile } = useFileFind();


    useEffect(() => {
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
                <div className="mx-6">
                    <h2 className="bg-blue-900 w-fit rounded-md p-2 text-sm text-white font-semibold">
                        Legajo #{file?.id}
                    </h2>
                </div>
                <div>

                </div>
            </article>
            
        </section>

    );
}

export default NoveltyDetailPage;