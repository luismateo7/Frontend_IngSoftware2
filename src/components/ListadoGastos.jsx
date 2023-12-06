import Gasto from "./Gasto"

const ListadoGastos = ({ gastos, setGastosEditar, eliminarGasto, filtro, gastosFiltrados }) => {

  const gastosMostrar = filtro ? gastosFiltrados : gastos //Decido que gastos son los que se muestran
  console.log(gastos);

  return (
    <div className='listado-gastos contenedor'>
      <h2>{gastosMostrar && gastosMostrar.length > 0 ? 'Gastos:' : 'No hay gastos aún'}</h2>

      {
        gastosMostrar && gastosMostrar.map(gasto => (
          <Gasto
            gasto={gasto}
            key={gasto.id || gasto._id}
            setGastosEditar={setGastosEditar}
            eliminarGasto={eliminarGasto}
          />
        ))
      }
    </div>
  );

}

export default ListadoGastos