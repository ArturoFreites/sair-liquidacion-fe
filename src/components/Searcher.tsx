import SearcherIcon from "./icons/SearcherIcon";

function Searcher() {
    return (
        <div className="flex justify-center items-center mx-4
            bg-neutral-200 rounded-md h-9 p-4
        ">
            <SearcherIcon width={15} height={15}/>
            <input placeholder="Ingrese parametro de busqueda" type="text" 
                className="h-9 px-4 py-2 text-sm"
            />
        </div>
    );
}

export default Searcher;