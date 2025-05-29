import { useNavigate } from "react-router-dom";

type Props = {
    name: string
    to: string
}

function ButtonNavigate({ name, to }: Props) {

    const navigate = useNavigate();

    return (
        <button
            className={`
            hover:shadow-lg
            transition-colors duration-200 
            active:scale-95
            cursor-pointer
            w-48 h-9 rounded-md 
            p-1 m-4 
            md:m-2 md:w-36 md:h-8
            bg-blue-900 text-white
            `}
            onClick={()=> navigate(to)}>
            <p className=
                'font-semibold text-sm md:text-xs' 
            >
                {name}
            </p>
        </button>
    );
}

export default ButtonNavigate ;