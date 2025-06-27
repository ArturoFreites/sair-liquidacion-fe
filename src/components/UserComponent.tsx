import { logout } from "../utils/logout";
import UserIcon from "./icons/UserIcon";

type Props ={
    open:boolean
}

function UserComponent({open}:Props) {

    const user = localStorage.getItem("name")

    return (
        <div className={`flex justify-center items-center
                    ${!open ? 'hidden' : ''}`}>
            <UserIcon width={35} height={35} className="fill-white"/>
            <div className='ml-2 transition-all duration-100'>
                <p className='text-xs font-bold'>{user}</p>
                <p 
                    onClick={()=>(logout())} 
                    className='text-xs underline cursor-pointer hover:text-gray-400 duration-300'
                >
                    Cerrar Sessión
                </p>
            </div>
        </div>
    );
}

export default UserComponent;