import { useEffect } from 'react';
import ButtonAction from './ButtonAction';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
};

export default function Modal({
    open,
    onClose,
    children,
    maxWidth = 'max-w-lg',
}: ModalProps) {

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        if (open) window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return(
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div
                data-testid="overlay"
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`relative z-10 w-full ${maxWidth} rounded-lg bg-white p-6 shadow-lg`}
                onClick={(e) => e.stopPropagation()} // evita que el click interno cierre
            >
                <button
                    aria-label="Cerrar"
                    onClick={onClose}
                    className="cursor-pointer absolute right-3 top-3 text-4xl leading-none text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>

                <div className='w-full flex justify-center items-center'>
                    <h2 className='text-2xl my-4 font-black'>FILTROS</h2>
                </div>
                <div className='mx-6 mb-6 w-full grid grid-cols-2'>
                    {children}
                </div>
                <div className='w-full flex justify-center items-center'>
                    <ButtonAction name='Filtrar' className='bg-blue-900 text-white font-semibold' />
                </div>
            </div>
        </div>
    );
}
