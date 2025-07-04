import type { File } from "../types/models/File";

type Props = {
    file?: File
}

function PersonResume({ file }: Props) {

    return (
        <div className="mx-6">
            <h3 className="bg-blue-900 w-fit rounded-md p-2 text-sm text-white font-semibold">Legajo #{file?.id}</h3>
            <div className="grid grid-cols-2 my-6 md:grid-cols-5">
                <div className="my-2">
                    <h4 className="text-sm font-semibold">Nombre</h4>
                    <p className="text-sm">{file?.person.name} {file?.person.lastName}</p>
                </div>
                <div className="my-2">
                    <h4 className="text-sm font-semibold">DNI</h4>
                    <p className="text-sm">{file?.person.dni}</p>
                </div>
                <div className="my-2">
                    <h4 className="text-sm font-semibold">Razón Social</h4>
                    <p className="text-sm">{file?.socialReason.name}</p>
                </div>
                <div className="my-2">
                    <h4 className="text-sm font-semibold">Centro de Costos</h4>
                    <p className="text-sm">{file?.costCenter.name}</p>
                </div>
                <div className="my-2">
                    <h4 className="text-sm font-semibold">Fecha de Alta</h4>
                    <p className="text-sm">
                        {file?.createdAt ? new Date(file.createdAt).toLocaleDateString() : '-'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PersonResume;