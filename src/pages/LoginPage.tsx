import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp'
import ButtonAction from '../components/ButtonAction';
import Input from '../components/Input';
import { useState, useEffect } from 'react';
import { useLogin } from '../hook/user/useLogin';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useLogin();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate(from, { replace: true });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <section className='flex'>
            <form className='w-full md:w-1/3 h-screen flex flex-col' onSubmit={handleSubmit}>
                <div className='h-2/6 w-full flex items-center justify-center'>
                    <img className='w-28 xl:w-48' src={logo} alt='Sair Liquidación' />
                </div>

                <div className='flex flex-col items-center w-full h-4/6'>
                    <Input
                        label={"Correo"}
                        placeHolder={"Ingrese correo"}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label={"Contraseña"}
                        placeHolder={"Ingrese contraseña"}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonAction
                        name="Ingresar"
                        className="bg-blue-800 hover:bg-blue-700 text-white"
                        type="submit"
                    />
                    <Link to={"/"}>
                        <p className='underline text-sm hover:text-gray-500 md:text-xs md:mt-1'>
                            Recuperar Contraseña
                        </p>
                    </Link>
                </div>
            </form>

            <div className='hidden md:flex w-2/3 bg-blue-900 h-screen items-center justify-center'>
                <p className='text-white font-black text-4xl'>LIQUIDACIÓN DE SUELDOS</p>
            </div>
        </section>
    );
}

export default LoginPage;
