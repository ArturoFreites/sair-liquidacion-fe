import { useNavigate } from "react-router-dom";
import type { JSX } from "react";

type Props = {
    name: string,
    options: string[],
    icon: JSX.Element;
}

function NavLinkItem({ name, options, icon }: Props) {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-baseline w-full justify-center px-10 my-6 capitalize">
            <div className="flex">
                {icon}
                <p onClick={()=>navigate(name)} className="ml-2 mb-2 text-sm font-semibold 
                    hover:text-neutral-300 hover:fill-neutral-300 
                    cursor-pointer"
                >{name}</p>
            </div>
            <div className="flex flex-col pl-6">
                {
                    options.map(
                        (option) => (
                            <p className="text-sm mb-2
                                font-light hover:text-neutral-300 hover:fill-neutral-300 
                                cursor-pointer w-fit
                            "
                            onClick={()=>navigate(option)}
                            >{option}</p>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default NavLinkItem;