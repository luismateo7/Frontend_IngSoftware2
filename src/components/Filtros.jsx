import { useState, useEffect } from 'react'

const Filtros = ({ filtro, setFiltro }) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Gastos</label>
                    <select
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="">--Todos los Gastos--</option>
                        <option value="656fcb92a49b0f432ffee557">Ahorro</option>
                        <option value="656fcb74a49b0f432ffee555">Comida</option>
                        <option value="656fcb81a49b0f432ffee556">Casa</option>
                        <option value="656fcb64a49b0f432ffee554">Gastos Varios</option>
                        <option value="ocio656d54ff29f9c2d59354bb5b">Ocio</option>
                        <option value="6567eb5792dcd0d7130757f2">Salud</option>
                        <option value="656fcb42a49b0f432ffee553">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros