type Props = {
    name: string
    className: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonAction({ name, className, onClick }: Props) {
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
            
            ${className}`}
            onClick={onClick}>
            <p className=
                'text-sm md:text-xs' 
            >
                {name}
            </p>
        </button>
    );
}

export default ButtonAction;