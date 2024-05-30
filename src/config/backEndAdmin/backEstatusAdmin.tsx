/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../firfebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
export const getPedidosUsuario = async () => {
  const result = await getDocs(collection(db, "pedidos"));

  const pedidos = result.docs.map((doc) => {
    const data = doc.data();
    const carritoCompra = data.carritoCompra;
    const datosEnvio = data.datosEnvio;
    const total = data.total;

    if (carritoCompra && carritoCompra.length > 0) {
      return carritoCompra.map((item: any) => ({
        id: doc.id, // Añadir el ID del pedido
        nombre: item.nombre,
        cantidad: item.cantidad,
        total: total,
        fecha: item.fecha,
        estatusEnv: datosEnvio?.estatusEnv,
        direccion: datosEnvio?.direccion || "",
        colonia: datosEnvio?.colonia || "",
        ciudad: datosEnvio?.ciudad || "",
        cp: datosEnvio?.cp || "",
        estado: datosEnvio?.estado || "",
        telefono: datosEnvio?.telefono || "",
        nombreEnvio: datosEnvio?.nombre || "",
        imagen: item.imagen || "",
      }));
    } else {
      console.error("No se encontraron pedidos.");
      return [];
    }
  });

  const pedidosFlat = pedidos.flat(); // Aplanar el array de pedidos
  // console.log("Pedidos obtenidos:", pedidosFlat);
  return pedidosFlat;
};


export const actualizarEstatusPedido = async (pedidoId: string, nuevoEstatus: string) => {
  if (!pedidoId) {
    console.error("El ID del pedido es nulo o indefinido.");
    return;
  }

  // Construir referencia al documento del pedido utilizando su ID
  const pedidoRef = doc(db, "pedidos", pedidoId);

  try {
    // Actualizar el campo estatusEnv dentro del campo datosEnv del documento
    await updateDoc(pedidoRef, {
      // Usamos la notación de puntos para acceder a campos anidados
      "datosEnvio.estatusEnv": nuevoEstatus,
    });
    // console.log("Estatus del pedido actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el estatus del pedido:", error);
    throw error;
  }
};

