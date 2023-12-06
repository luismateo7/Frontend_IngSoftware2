const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> //Children contiene el mensaje y tipo el nombre de la clase para darle estilos
  )
}

export default Mensaje