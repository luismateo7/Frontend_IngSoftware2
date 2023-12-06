import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import ListadoGastos from '../components/ListadoGastos';
import Modal from '../components/Modal';
import Filtros from '../components/Filtros';
import Navbar from '../components/Navbar';

import IconoNuevoGasto from '../img/nuevo-gasto.svg';

import axios from 'axios';

function Movimiento() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const presupuestoInicial = localStorage.getItem('presupuesto') ? true : false;

  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto'));
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(presupuestoInicial);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const [gastosEditar, setGastosEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const guardarGasto = async (gasto) => {

    console.log(gasto);

    if (gasto.id || gasto._id) {
      // Editar Gasto
      try {
        gasto.owner = JSON.parse(localStorage.getItem('auth'))._id;

        console.log(gastos);
        console.log(gasto);
        gasto._id = gasto.id

        const gastosActualizados = gastos.map((gastoState) => (gastoState._id === gasto.id ? gasto : gastoState));
        setGastos(gastosActualizados);

      } catch (error) {
        console.error('Error al actualizar el gasto:', error);
      }
    } else {
      // Nuevo Gasto
      gasto.fecha = Date.now();
      gasto.owner = JSON.parse(localStorage.getItem('auth'))._id;

      try {
        setGastos([...gastos, gasto]);
      } catch (error) {
        console.error('Error al crear el nuevo gasto:', error);
      }
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = async (id) => {

    try {
      await axios.put(`https://backend-ing-software-2-juv5yvm2l-luismateo7.vercel.app/api/movimientos/eliminar-movimiento/${id}`, {}, config);
      const gastosActualizados = gastos.filter((gasto) => gasto._id !== id);
      setGastos(gastosActualizados);
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      navigate('/');
    } else {
      const { _id } = JSON.parse(localStorage.getItem('auth'));
      const getMovimientos = async () => {
        try {
          const { data } = await axios.get('https://backend-ing-software-2-juv5yvm2l-luismateo7.vercel.app/api/movimientos/listar-movimientos', config);
          setGastos(data);
        } catch (error) {
          console.error('Error al obtener los movimientos:', error);
        }
      };
      if(isValidPresupuesto){
        getMovimientos();
      }
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    if (Object.keys(gastosEditar).length > 0) {
      handleNuevoGasto();
    }
  }, [gastosEditar]);

  useEffect(() => {
    setGastosFiltrados(gastos.filter((gasto) => gasto.categoria === filtro));
  }, [filtro]);

  return (
    <div className={modal ? 'fijar' : ''}>
      <Navbar />
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastosEditar={gastosEditar}
          setGastosEditar={setGastosEditar}
        />
      )}
    </div>
  );
}

export default Movimiento;
