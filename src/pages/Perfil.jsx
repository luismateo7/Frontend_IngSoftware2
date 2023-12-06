import PDF from "../components/PDF"
import { PDFDownloadLink } from "@react-pdf/renderer"
import Navbar from "../components/Navbar"
import InputForm from "../components/InputForm"

export default function Perfil() {

  const auth = localStorage.getItem("auth");
  const email = JSON.parse(auth).email;
  const nombre = JSON.parse(auth).nombre;
  const apellido = JSON.parse(auth).apellido;

  return (
    <>
      <Navbar />
      <h1 className="titulo text-center font-bold mt-4" style={{ color: "#3b82f6" }}>Perfil</h1>

      <div className="w-3/4 m-auto">
        <InputForm id={'email'} descripcion={'Email'} tipo={'text'} valor={email} color={'text-black'} obligatorio={true} placeholder={'Ingrese su email o nombre de usuario'} />

        <InputForm id={'nombre'} descripcion={'Nombre'} tipo={'text'} valor={nombre} color={'text-black'} obligatorio={true} placeholder={'Ingrese su email o nombre de usuario'} />

        <InputForm id={'apellido'} descripcion={'Apellido'} tipo={'text'} valor={apellido} color={'text-black'} obligatorio={true} placeholder={'Ingrese su email o nombre de usuario'} />

        <div className="flex justify-center mt-8">
          <PDFDownloadLink document={<PDF />} fileName="MisMovimientos.pdf">
            {({ loading, error }) => (loading ? "Loading document..." : <button className="rounded-lg text-white p-3 uppercase" style={{ backgroundColor: "#3b82f6" }}>Descargar Movimientos</button>)}
          </PDFDownloadLink>
        </div>
      </div>
    </>
  )
}