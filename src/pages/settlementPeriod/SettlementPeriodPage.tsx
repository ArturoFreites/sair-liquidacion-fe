import ButtonNavigate from "../../components/ButtonNavigate";
import Filters from "../../components/Filters";
import Searcher from "../../components/Searcher";
import SettlementPeriodTable from "../../components/settlementPeriod/SettlementPeriodTable";
import { ROUTES } from "../../routes/ROUTES";

function SettlementPeriodPage(){
    return ( 
        <section className="mb-10 md:mb-0">
            <div className='m-6'>
                <h1 className='font-black text-2xl'>
                    PERIODOS
                </h1>
                <h2 className='font-medium text-xl'>Listado</h2>
            </div>
            <div className=" grid grid-cols-1 justify-items-center w-full md:flex items-center md:justify-end" >
                <ButtonNavigate name="Crear Periodo" to={ROUTES.CREATE_SETTLEMENT_PERIOD}/>
                <Filters/>
                <Searcher/>
            </div>
            <SettlementPeriodTable/>
        </section>
    );
}

export default SettlementPeriodPage;