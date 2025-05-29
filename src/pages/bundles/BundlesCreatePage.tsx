import { useState } from 'react';
import ButtonAction from '../../components/ButtonAction';
import Input from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import { CENTRO_DE_COSTOS, RAZON_SOCIALES } from '../../services/types';
import type { CostCenter, SocialReason } from '../../types/Bundles.types';
import Checkbox from '../../Checkbox';

function BundlesCreatePage() {
    /* ---- Estado local ---- */
    const [razonSocialId, setRazonSocialId] = useState<number | null>(null);

    return (
        <section>
            <div className="m-6">
                <h1 className="text-2xl font-black">LEGAJOS</h1>
                <h2 className="text-xl font-medium">Alta</h2>
            </div>

            <div className="my-10 grid grid-cols-3 justify-center items-center">
                <Input label="Nombre" placeHolder="Ingrese nombre" type="text" value="" />
                <Input label="Apellido" placeHolder="Ingrese apellido" type="text" value="" />
                <Input label="DNI" placeHolder="Ingrese DNI" type="number" value="" />

                <Dropdown<SocialReason, number>
                    label="Razón Social"
                    options={RAZON_SOCIALES}
                    value={razonSocialId}
                    onChange={(val) => setRazonSocialId(val)}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder="Seleccione razón social"
                />

                <Dropdown<CostCenter, number>
                    label="Centro de Costos"
                    options={CENTRO_DE_COSTOS}
                    value={razonSocialId}
                    onChange={(val) => setRazonSocialId(val)}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder="Seleccione centro de costos"
                />
                
                <Input label="Puesto" placeHolder="Ingrese puesto" type="text" value="" />
                <Input label="Fecha de Nacimiento" type="date" value="" className='p-'/>
                <Input label="Fecha de Alta" type="date" value=""/>
                <Input label="Cuit" placeHolder='Ingrese cuit' type="text" value=""/>
                <Input label="CBU" placeHolder='Ingrese cbu' type="text" value=""/>

                <Dropdown<CostCenter, number>
                    label="Banco"
                    options={CENTRO_DE_COSTOS}
                    value={razonSocialId}
                    onChange={(val) => setRazonSocialId(val)}
                    getOptionLabel={(o) => o.name}
                    getOptionValue={(o) => o.id}
                    placeholder="Seleccione banco"
                />
                <Input label="Factor Sueldo" placeHolder='Ingrese factor sueldo' type="number" value="" />            
                <Checkbox option='Liquida comisiones'/>

            </div>

            <div className="flex w-full justify-center mt-24">
                <ButtonAction
                    name="Guardar"
                    className="font-semibold bg-blue-900 text-white hover:bg-blue-700"
                />
            </div>
        </section>
    );
}

export default BundlesCreatePage;
