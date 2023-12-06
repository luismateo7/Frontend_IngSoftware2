import {
    Document,
    Page,
    Text,
    Image,
    View
} from "@react-pdf/renderer";

import { useState, useEffect } from "react";
import axios from "axios";
import { formatearFecha } from "../helpers/generarId";

export default function PDF() {
    const [gastos, setGastos] = useState([]);

    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");
    const nombreCliente = JSON.parse(auth).nombre;
    const apellidoCliente = JSON.parse(auth).apellido;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const getMovimientos = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/movimientos/listar-movimientos",
                    config
                );
                console.log(data);
                setGastos(data);
            } catch (error) {
                console.error("Error al obtener los movimientos:", error);
            }
        };

        getMovimientos();
    }, []);

    const categoriaTransform = (categoria) => {
        switch (categoria) {
            case "6567eb5792dcd0d7130757f2":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888881/icono_salud_yxqj3b.png";
            case "656d54ff29f9c2d59354bb5b":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888959/icono_ocio_mcogyo.png";
            case "656fcb42a49b0f432ffee553":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888881/icono_suscripciones_ji8jlu.png";
            case "656fcb64a49b0f432ffee554":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888960/icono_gastos_v7iriz.png";
            case "656fcb74a49b0f432ffee555":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888962/icono_comida_tgzqxz.png";
            case "656fcb81a49b0f432ffee556":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888962/icono_casa_kei8l7.png";
            case "656fcb92a49b0f432ffee557":
                return "https://res.cloudinary.com/dqtirelyc/image/upload/v1701888962/icono_ahorro_duoeot.png";
            default:
                return "Otra categoría";
        }
    };

    // Calculate total expense
    const totalExpense = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);

    // Find start and end dates
    const startDate = gastos.length > 0 ? formatearFecha(gastos[0].fecha) : '';
    const endDate = gastos.length > 0 ? formatearFecha(gastos[gastos.length - 1].fecha) : '';

    return (
        <Document>
            <Page>
                <View style={{ margin: 10, textAlign: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30, marginTop: 20 }}>Reporte de Gastos de {nombreCliente + " " + apellidoCliente}</Text>
                    {gastos.map((gasto) => (
                        <View
                            key={gasto._id}
                            style={{
                                backgroundColor: '#f0f0f0',
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image src={categoriaTransform(gasto.categoria)} style={{ width: "100em" }} />
                            <Text style={{ fontSize: 14 }}>{gasto.nombre}</Text>
                            <Text style={{ fontSize: 12 }}>
                                Agregado el <Text style={{ fontWeight: "bold" }}>{formatearFecha(gasto.fecha)}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, marginTop: 10 }}>{`$${gasto.cantidad}`}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ textAlign: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Gastos: ${totalExpense}</Text>
                    <Text style={{ fontSize: 14, marginTop: 10 }}>
                        Periodo: {startDate} - {endDate}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}