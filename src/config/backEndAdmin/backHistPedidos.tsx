/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../firfebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export const getPedidosUsuario = async () => { // Elimina el parámetro uidUser
  const result = await getDocs(collection(db, "pedidos")); // Elimina la condición where

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
      console.error("No se encontraron pedidos en la colección.");
      return [];
    }
  });

  // console.log("Pedidos obtenidos:", pedidos);
  return pedidos;
};
