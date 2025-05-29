// Nav.tsx
import { useState } from 'react';
import logo from '../assets/logo-white.webp';
import UserComponent from './UserComponent';

export default function Nav() {
    const [open, setOpen] = useState(true);   // abierta al arrancar

    return (
        <>
            <aside
                className={`fixed sm:static inset-y-0 left-0 z-40 bg-blue-900
                    text-white flex flex-col h-screen transition-all duration-300
                    transform sm:transform-none
                    ${open ? 'sm:w-60 lg:w-72' : 'sm:w-28 lg:w-32'}`}>
                
                <div onClick={() => setOpen(!open)} className="flex items-center justify-center sm:h-24 h-16 m-6">
                    <img src={logo} className="w-24 cursor-pointer hover:scale-95 hover:duration-300" alt="Logo" />
                </div>

                
                <nav className="flex-1 px-2 space-y-2">
                    
                </nav>

                <div className="h-24 flex items-center justify-center">
                    <UserComponent open={open} />
                </div>
            </aside>
        </>
    );
}
