import { useState } from 'react';
import Mensaje from './Mensaje';
import axios from 'axios';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  const handlePresupuesto = async (e) => {
    e.preventDefault();

    setIsValidPresupuesto(false);
    setMensaje('');

    if (!(presupuesto) || presupuesto < 1) {
      setMensaje('No es un presupuesto válido');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    setIsValidPresupuesto(true);

    try {
      await axios.put('backendingsoftware2-production.up.railway.app/api/usuarios/actualizar-presupuesto', { presupuesto }, config);
      // Aquí podrías agregar lógica adicional si es necesario después de actualizar el presupuesto.
    } catch (error) {
      console.error('Error al actualizar el presupuesto:', error);
    }
  };

  const handleKeyDown = (e) => {
    // Verificar si la tecla presionada es Enter
    if (e.key === 'Enter') {
      handlePresupuesto(e);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="presupuestoUsuario">Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            id="presupuestoUsuario"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
