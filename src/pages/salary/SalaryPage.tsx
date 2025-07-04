import Filters from "../../components/Filters";
import SalaryTable from "../../components/salary/SalaryTable";
import Searcher from "../../components/Searcher";

function SalaryPage() {
    return (
        <section className="mb-10 md:mb-0">
            <div className='m-6'>
                <h1 className='font-black text-2xl'>
                    SUELDOS
                </h1>
                <h2 className='font-medium text-xl'>Listado</h2>
            </div>
            <div className=" grid grid-cols-1 justify-items-center w-full md:flex items-center md:justify-end" >
                <Filters />
                <Searcher />
            </div>
            <SalaryTable />
        </section>
    );
}

export default SalaryPage;