import UserIcon from "./icons/UserIcon";

type Props ={
    open:boolean
}

function UserComponent({open}:Props) {

    const user = {
        "name": "Ignacio",
        "lastName": "Sabino"
    }

    return (
        <div className={`flex justify-center items-center
                    ${!open ? 'hidden' : ''}`}>
            <UserIcon width={45} height={45} className="fill-white"/>
            <div className='ml-2 transition-all duration-100'>
                <p className='text-sm font-bold'>{user.name + " " + user.lastName}</p>
                <p 
                    onClick={()=>(console.log("Salir"))} 
                    className='text-sm underline cursor-pointer hover:text-gray-400 duration-300'
                >
                    Cerrar Sessión
                </p>
            </div>
        </div>
    );
}

export default UserComponent;