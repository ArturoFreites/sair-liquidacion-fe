// src/components/Nav.tsx
import { useState } from 'react';
import logo from '../assets/logo-white.webp';
import UserComponent from './UserComponent';
import NavLinks from './nav/NavLinks';

export default function Nav() {
    const [open, setOpen] = useState(true);

    return (
        <>
            {/* Mobile Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className={`fixed bottom-25 right-5 z-50 sm:hidden bg-blue-900 rounded-full p-3 shadow-lg ${open ? 'hidden' : ''}`}
            >
                <img src={logo} alt="Abrir menú" className="w-10 h-10" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed w-full sm:static min-h-screen inset-y-0 left-0 z-40 bg-blue-900 text-white flex-col
                            transition-all duration-300 transform
                            ${open ? 'translate-x-0' : 'translate-x-full'}
                            sm:translate-x-0 
                            ${open ? 'sm:w-72' : 'sm:w-30'}
                        `}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center sm:h-24 h-16 m-6"
                >
                    <img
                        src={logo}
                        className="w-20 cursor-pointer hover:scale-95 hover:duration-300"
                        alt="Logo"
                    />
                </div>

                <button
                    aria-label="Cerrar"
                    onClick={()=>setOpen(!open)}
                    className="md:hidden cursor-pointer absolute right-3 top-3 text-5xl leading-none text-gray-white hover:text-gray-600"
                >
                    ×
                </button>

                <NavLinks open={open}/>

                <div className="h-24 flex items-center justify-center">
                    <UserComponent open={open} />
                </div>
            </aside>
        </>
    );
}
