import { useState, useEffect } from 'react'
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg'

import axios from 'axios';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastosEditar, setGastosEditar }) => {

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    console.log(gastosEditar);

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState(gastosEditar.id || gastosEditar._id);
    const [fecha, setFecha] = useState('');

    const handleOcultarModal = () => {
        setAnimarModal(false);
        setGastosEditar({}); //Si el form se cerró y tenía gastos a editar entonces lo deja vacío almenos que otra vez quiera editar cuyo caso tiene que hacer el SwipeAction

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('') || cantidad < 1) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('');
            }, 1000);

            return
        }

        setGastosEditar({}); //Limpiar los gastos a editar
        const gasto = { nombre, cantidad, categoria, id, fecha };
        console.log(gasto);
        guardarGasto(gasto);
        gasto.owner = JSON.parse(localStorage.getItem('auth'))._id;

        if (Object.keys(gastosEditar).length > 0) {
            console.log('entra al if');
            const id = gastosEditar.id || gastosEditar._id;
            await axios.put(`http://localhost:4000/api/movimientos/actualizar-movimiento/${id}`, gasto, config)
        } else {
            console.log('entra al else');
            await axios.post('http://localhost:4000/api/movimientos/crear-movimiento', gasto, config)
        }
    }

    useEffect(() => {
        if (Object.keys(gastosEditar).length > 0) {
            setNombre(gastosEditar.nombre)
            setCantidad(gastosEditar.cantidad)
            setCategoria(gastosEditar.categoria)
            setId(gastosEditar._id || gastosEditar.id)
            setFecha(gastosEditar.fecha)
        }
    }, []) //Si el state gastoEditar que pase por Prop contiene algo es porque hay algo que editar por lo tanto los input del form van a tener sus valores con el gasto de ese state gastosEditar

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn}
                    alt="cerrar-modal"
                    onClick={handleOcultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{gastosEditar.nombre ? 'Editar Gasto' : 'Nuevo Presupuesto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input
                        id='nombre'
                        placeholder='Añade el Nombre del Gasto'
                        type='text'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id='cantidad'
                        placeholder='Añade la cantidad del gasto: ej. 300'
                        type='number'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="656fcb92a49b0f432ffee557">Ahorro</option>
                        <option value="656fcb74a49b0f432ffee555">Comida</option>
                        <option value="656fcb81a49b0f432ffee556">Casa</option>
                        <option value="656fcb64a49b0f432ffee554">Gastos Varios</option>
                        <option value="ocio656d54ff29f9c2d59354bb5b">Ocio</option>
                        <option value="6567eb5792dcd0d7130757f2">Salud</option>
                        <option value="656fcb42a49b0f432ffee553">Suscripciones</option>
                    </select>

                </div>

                <input type="submit" value={gastosEditar.nombre ? 'Guardar Cambios' : 'Añadir gasto'} />

            </form>
        </div>
    )
}

export default Modal