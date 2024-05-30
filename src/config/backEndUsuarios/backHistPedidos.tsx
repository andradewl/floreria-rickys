import { db } from "../firfebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getPedidosUsuario = async (uidUser: string) => {
  const result = await getDocs(
    query(collection(db, "pedidos"), where("uidUserLogin", "==", uidUser))
  );

  const pedidos = result.docs.map((doc) => {
    const data = doc.data();
    const carritoCompra = data.carritoCompra;
    const total = data.total;

    if (carritoCompra && carritoCompra.length > 0) {
      const carritoData = carritoCompra.map((item: any) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        total: total, // Reemplaza precio por total
        fecha: item.fecha
      }));
      return carritoData;
    } else {
      console.error("No se encontraron pedidos para el usuario con UID:", uidUser);
      return [];
    }
  });

  console.log("Pedidos obtenidos:", pedidos);
  return pedidos;
};
