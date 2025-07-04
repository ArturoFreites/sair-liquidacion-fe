import LegajosIcon from "../components/icons/LegajosIcon";

export const NAVLINKS = [
    {
        id:1,
        name:"legajos",
        icon: <LegajosIcon className="fill-white" width={20} height={20} />,
        options:[]
    },
    {
        id:2,
        name:"liquidación",
        icon: <LegajosIcon className="fill-white" width={20} height={20} />,
        options:[
            "conceptos",
            "novedades",
            "sueldos",
            "ejecutar liquidación"
        ]
    },
    {
        id:3,
        name:"reportes",
        icon: <LegajosIcon className="fill-white" width={20} height={20} />,
        options:[
            "razón social",
            "centro de costos",
            "conceptos"
        ]
    },
    {
        id:4,
        name:"admin",
        icon: <LegajosIcon className="fill-white" width={20} height={20} />,
        options:[
            "alta usuarios",
            "carga razón social",
            "periodos"
        ]
    }
]