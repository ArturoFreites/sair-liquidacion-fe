import ButtonNavigate from "../../components/ButtonNavigate";
import ConceptTable from "../../components/concepts/ConceptTable";
import Filters from "../../components/Filters";
import Searcher from "../../components/Searcher";
import { ROUTES } from "../../routes/ROUTES";

function ConceptPage() {
    return (
        <section className="mb-10 md:mb-0">
            <div className='m-6'>
                <h1 className='font-black text-2xl'>
                    CONCEPTOS
                </h1>
                <h2 className='font-medium text-xl'>Listado</h2>
            </div>
            <div className=" grid grid-cols-1 justify-items-center w-full md:flex items-center md:justify-end" >
                <ButtonNavigate name="Crear Concepto" to={ROUTES.CREATE_CONCEPT}/>
                <Filters/>
                <Searcher/>
            </div>
            <ConceptTable/>
        </section>
    );
}

export default ConceptPage;