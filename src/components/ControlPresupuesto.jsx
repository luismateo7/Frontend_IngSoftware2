import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios'

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    useEffect(() => {
        const totalGastado = gastos ? gastos.reduce((total, gasto) => gasto.cantidad + total, 0) : 0;
        const totalDisponible = presupuesto - totalGastado

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setPorcentaje(nuevoPorcentaje)

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        Swal.fire({
            title: 'Estas seguro que deseas eliminar el presupuesto y los gastos?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--azul)',
            cancelButtonColor: '#db2777',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar',
            width: '50rem',
            textSize: '2rem'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Has reseteado el presupuesto y los gastos',
                    text: 'Has eliminado exitosamente la información',
                    icon: 'success'
                }).then(() => {
                    setGastos([])
                    setPresupuesto(0)
                    setIsValidPresupuesto(false)
                    axios.put('http://localhost:4000/api/usuarios/resetear-movimientos', {}, config)
                })
            }
        })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'

                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto