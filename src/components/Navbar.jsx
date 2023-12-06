import logoSVG from "../../public/logo.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const handldeLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="w-full h-24 bg-white">
            <div className="flex justify-between">
                <div className="flex justify-between p-4">
                    <img src={logoSVG} alt="logo" className="w-16 h-16" />
                    <Link to={'/movimientos'} className="font-bold text-5xl mt-2 ml-2" style={{color: "#3b82f6"}}>Spendify</Link>
                </div>
                <div className="flex mt-8 pr-10">
                    <Link to={'/perfil'} className="text-3xl font-bold text-center mr-5 uppercase" style={{ color: "#3b82f6" }}>Mi perfil</Link>

                    <Link to={"/movimientos"} className="text-3xl font-bold text-center uppercase" style={{ color: "#3b82f6" }}>Movimientos</Link>

                    { (location.pathname == "/movimientos" || location.pathname == "/perfil" ) && (
                        <Link to={"/"} onClick={handldeLogout} className="text-3xl font-bold text-center ml-5 uppercase" style={{ color: "#3b82f6" }}>Cerrar sesión</Link>
                    
                    )}
                </div>
            </div>
        </div>
    )
}