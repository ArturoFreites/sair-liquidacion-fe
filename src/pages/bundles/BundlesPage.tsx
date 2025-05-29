import BundlesTable from "../../components/bundles/BundlesTable";
import ButtonNavigate from "../../components/ButtonNavigate";
import Filters from "../../components/Filters";
import Searcher from "../../components/Searcher";
import { ROUTES } from "../../routes/ROUTES";

function BundlesPage() {
    return (
        <section>
            <div className='m-6'>
                <h1 className='font-black text-2xl'>
                    LEGAJOS
                </h1>
                <h2 className='font-medium text-xl'>Listado</h2>
            </div>
            <div className="w-full flex items-center justify-end" >
                <ButtonNavigate name="Crear Legajo" to={ROUTES.CREATE_BUNDLE}/>
                <Filters/>
                <Searcher/>
            </div>
            <BundlesTable/>
        </section>

    );
}

export default BundlesPage;