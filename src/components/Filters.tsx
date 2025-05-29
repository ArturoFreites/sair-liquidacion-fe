import { useState } from "react";
import ButtonAction from "./ButtonAction";
import Modal from "./Modal";

function Filters() {

    const [open, setOpen] = useState(false);
    return (
        <>
            <ButtonAction onClick={()=>setOpen(true)} name="Filtros" className="bg-indigo-400 text-white font-semibold" />
            <Modal open={open} onClose={() => setOpen(false)}>
                <p>contenido</p>
            </Modal>
        </>
    );
}

export default Filters;