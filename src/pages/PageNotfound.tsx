import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp"

function PageNotfound() {

    const navigate = useNavigate()

    return (
        <section className="w-screen h-screen flex
            flex-col items-center
            ">
            <article className="w-screen h-1/5 flex justify-center items-center bg-white m-8">
                <img className="w-40" src={logo} />
            </article>
            <article className="bg-blue-900 w-screen flex justify-center items-center h-4/5">
                <div className="text-white flex flex-col justify-center items-center px-20">
                    <h1 className="text-3xl font-black">¡Ups! No encontramos lo que buscabas</h1>
                    <h2> La página que estás intentando visitar no existe, fue eliminada o el enlace es incorrecto.</h2>
                    <div className="m-6">
                        <p className="font-semibold mb-2">
                            ¿Qué podés hacer ahora?
                        </p>
                        <ul className="text-sm list-disc">
                            <li>Volver a la página
                                <span onClick={() => navigate("/")} className="underline hover:font-semibold ml-1 duration-300 cursor-pointer">
                                    principal
                                </span>
                            </li>
                            <li>Revisar la URL</li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default PageNotfound;