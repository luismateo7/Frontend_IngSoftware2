import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import InputForm from "../components/InputForm";
import InputPassword from "../components/InputPassword";
import Navbar from "../components/Navbar";
import Alerta from "../components/Alerta";

export default function Registro() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth') && localStorage.getItem('token')) {
            navigate('/movimientos')
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password, nombre, apellido].includes('')) {
            setAlerta({
                msg: 'Faltan campos obligatorios (*)',
                error: true
            })
            return
        }

        try {
            // Si hay username, entonces se registra con username, sino, se registra sin username
            if (username) {
                const { data } = await axios.post(`backendingsoftware2-production.up.railway.app/api/usuarios/registro`, { email, password, nombre, apellido, username })

                localStorage.setItem('token', data.token);

                const objetoAuth = {
                    nombre: data.nombre,
                    email: data.email,
                    apellido: data.apellido,
                    username: data.username,
                    _id: data._id
                }

                localStorage.setItem('auth', JSON.stringify(objetoAuth));

                setAlerta({
                    msg: data.msg,
                    error: false
                })

            } else {
                await axios.post(`backendingsoftware2-production.up.railway.app/api/usuarios/registro`, { email, password, nombre, apellido })

                localStorage.setItem('token', data.token);

                const objetoAuth = {
                    nombre: data.nombre,
                    email: data.email,
                    apellido: data.apellido,
                    _id: data._id
                }

                localStorage.setItem('auth', JSON.stringify(objetoAuth));

                setAlerta({
                    msg: data.msg,
                    error: false
                })
            }

            setTimeout(() => {
                navigate("/movimientos")
            }, 2000);

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
                <InputForm id={'email'} descripcion={'Email'} tipo={'text'} modificador={setEmail} valor={email} color={'text-black'} obligatorio={true} placeholder={'Ingrese su email '} />

                <InputForm id={'nombre'} descripcion={'Nombre'} tipo={'text'} modificador={setNombre} valor={nombre} color={'text-black'} obligatorio={true} placeholder={'Ingrese su nombre'} />

                <InputForm id={'apellido'} descripcion={'Apellido'} tipo={'text'} modificador={setApellido} valor={apellido} color={'text-black'} obligatorio={true} placeholder={'Ingrese su apellido'} />

                <InputForm id={'username'} descripcion={'Username'} tipo={'text'} modificador={setUsername} valor={username} color={'text-black'} obligatorio={false} placeholder={'Ingrese su username'} />

                <div className="mt-10">
                    <InputPassword id={'password'} descripcion={'Contraseña'} modificador={setPassword} valor={password} color={'text-black'} obligatorio={true} placeholder={'Ingrese su contraseña'} /> {/* PASSWORD */}
                </div>

                <div className="text-center my-7 mx-auto rounded-md">
                    <input
                        type="submit"
                        value="Registrarse"
                        className="text-white uppercase text-3xl rounded-lg px-5 py-2 font-bold"
                        style={{ backgroundColor: "#3b82f6" }}
                    />
                </div>

            </form>

            <div className="font-bold flex gap-1 mt-5 justify-center text-sm">
                <p className="text-xl">Ya tengo cuenta</p>
                <Link to="/" className="text-xl" style={{ color: "#3b82f6" }}>iniciar sesión </Link>
            </div>

        </>
    )
}
