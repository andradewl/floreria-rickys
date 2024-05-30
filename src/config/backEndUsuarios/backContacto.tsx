import { db } from "../firfebase";
import { collection, addDoc } from "firebase/firestore";

interface ContactoData {
  nombre: string;
  apellido: string;
  correoElectronico: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export const agregarRegistroContacto = async (datosContacto: ContactoData) => {
  try {
    await addDoc(collection(db, "Contacto"), datosContacto);
    // console.log("Registro de contacto agregado correctamente.");
  } catch (error) {
    console.error("Error al agregar registro de contacto:", error);
    throw new Error("Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."); 
  }
};
