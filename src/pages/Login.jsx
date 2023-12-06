import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import InputForm from "../components/InputForm";
import InputPassword from "../components/InputPassword";
import Navbar from "../components/Navbar";
import Alerta from "../components/Alerta";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('auth') && localStorage.getItem('token')) {
            navigate('/movimientos')
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await axios.post(`https://backend-ing-software-2-juv5yvm2l-luismateo7.vercel.app/api/usuarios/login`, { email, password })

            localStorage.setItem('token', data.token);

            const objetoAuth = {
                nombre: data.nombre,
                email: data.email,
                apellido: data.apellido,
                _id: data._id,
            }

            localStorage.setItem('auth', JSON.stringify(objetoAuth));
            localStorage.setItem('presupuesto', data.presupuesto);

            navigate("/movimientos")

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;

    return (
        <>
            <Navbar />
            <h1 className="titulo text-center font-bold mt-4" style={{ color: "#3b82f6" }}>Bienvenido</h1>

            {msg && (
                <div className='-mt-4'>
                    <Alerta alerta={alerta} />
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <InputForm id={'username'} descripcion={'Email o Nombre de Usuario'} tipo={'text'} modificador={setEmail} valor={email} color={'text-black'} obligatorio={true} placeholder={'Ingrese su email o nombre de usuario'} />

                <div className="mt-10">
                    <InputPassword id={'password'} descripcion={'Contraseña'} modificador={setPassword} valor={password} color={'text-black'} obligatorio={true} placeholder={'Ingrese su contraseña'} /> {/* PASSWORD */}
                </div>

                <p  className="flex justify-end w-4/5 md:w-2/5 m-auto font-bold text-xl mt-2">He olvidado mi contraseña</p>

                <div className="text-center my-7 mx-auto rounded-md">
                    <input
                        type="submit"
                        value="Entrar"
                        className="text-white uppercase text-3xl rounded-lg px-5 py-2 font-bold"
                        style={{ backgroundColor: "#3b82f6" }}
                    />
                </div>

            </form>

            <div className="font-bold flex gap-1 mt-5 justify-center text-sm">
                <p className="text-xl">No tengo cuenta</p>
                <Link to="/registro" className="text-xl" style={{ color: "#3b82f6" }}>crear cuenta </Link>
            </div>

        </>
    )
}
