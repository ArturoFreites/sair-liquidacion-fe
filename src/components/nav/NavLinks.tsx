import { NAVLINKS } from "../../services/navlinks";
import NavLinkItem from "./NavLinkItem";

type Props = {
    open:boolean
}

function NavLinks({open}:Props) {
    return (
        <nav className={`${!open && 'hidden'} flex-1 px-2 space-y-2 py-6`}>
            {
                NAVLINKS.map(
                    (link)=>(
                        <NavLinkItem
                            name={link.name}
                            options={link.options}
                            icon={link.icon}
                        />
                    )
                )
            }
        </nav>
    );
}

export default NavLinks;