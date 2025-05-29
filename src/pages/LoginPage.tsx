import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp'
import ButtonAction from '../components/ButtonAction';
import Input from '../components/Input';

function LoginPage() {
    return (
        <section className='flex'>
            <div 
                className='w-1/3 h-screen flex flex-col'
            >
                <div className='h-2/5 w-full flex items-center justify-center'>
                    <img className='w-48' src={logo} alt='Sair Liquidación' />
                </div>

                <div className='flex flex-col items-center w-full h-3/5'>
                    <Input
                        label={"Correo"}
                        placeHolder = {"Ingrese correo"}
                        type = {"email"}
                        value={""}

                    />
                    <Input
                        label={"Contraseña"}
                        placeHolder = {"Ingrese contraseña"}
                        type = {"password"}
                        value={""}
                        
                    />
                    <ButtonAction
                        name="Ingresar"
                        className="bg-blue-800 hover:bg-blue-700 text-white"
                    />
                    <Link to={"/"}>
                        <p className='underline text-sm hover:text-gray-500 md:text-xs md:mt-1'>
                            Recuperar Contraseña
                        </p>
                    </Link>
                </div>
            </div>
            <div className='w-2/3 bg-blue-900 h-screen flex items-center justify-center'>
                <p className='text-white font-black text-4xl'>ADMINISTACIÓN DE HABERES</p>
            </div>
        </section>
    );
}

export default LoginPage;