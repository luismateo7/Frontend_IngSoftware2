import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from "../helpers/generarId"

import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

const diccionarioIconos = {
    ahorro: IconoAhorro,
    casa: IconoCasa,
    comida: IconoComida,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({gasto, setGastosEditar, eliminarGasto}) => {

    console.log(gasto);
    const {nombre, categoria, cantidad, fecha, _id} = gasto;

    const leadingActions = ()=>(
        <LeadingActions>
            <SwipeAction onClick={()=> setGastosEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = ()=>(
        <TrailingActions>
            <SwipeAction 
                onClick={()=> eliminarGasto(_id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    const categoriaTransform = categoria == "6567eb5792dcd0d7130757f2" ? "salud" : categoria == "656d54ff29f9c2d59354bb5b" ? "ocio" : categoria == "656fcb42a49b0f432ffee553" ? "suscripciones" : categoria == "656fcb64a49b0f432ffee554" ? "gastos" : categoria == "656fcb74a49b0f432ffee555" ? "comida" : categoria == "656fcb81a49b0f432ffee556" ? "casa" : categoria == "656fcb92a49b0f432ffee557" ? "ahorro" : ""

    console.log(categoriaTransform);

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={diccionarioIconos[categoriaTransform]}
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoriaTransform}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>

                    </div>
                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
        
    )
}

export default Gasto