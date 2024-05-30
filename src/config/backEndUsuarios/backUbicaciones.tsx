import { db } from "../firfebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export const addDireccion = (
  nombre: string,
  apellido: string,
  zip: string,
  estado: string,
  municipio: string,
  colonia: string,
  calle: string,
  NumE: string,
  NumI: string,
  refCalle1: string,
  refCalle2: string,
  tipo: string,
  telRemitente: string,
  telDestinatario: string,
  referencias: string,
  relUsuario: string
) => {
  addDoc(collection(db, "direcciones"), {
    nombre,
    apellido,
    zip,
    estado,
    municipio,
    colonia,
    calle,
    NumE,
    NumI,
    refCalle1,
    refCalle2,
    tipo,
    telRemitente,
    telDestinatario,
    referencias,
    relUsuario,
  });
};

export const getUbicaciones = async (id: string) => {
  const result = await getDocs(query(collection(db, "direcciones", id)));
  return result;
};

export const deleteDireccion = async (id: string) => {
  try {
    await deleteDoc(doc(db, "direcciones", id));
    console.log("dirección eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar direccion:", error);
    throw error;
  }
};

export const updateDireccion = async (
  id: string,
  nombre: string,
  apellido: string,
  zip: string,
  estado: string,
  municipio: string,
  colonia: string,
  calle: string,
  NumE: string,
  NumI: string,
  refCalle1: string,
  refCalle2: string,
  tipo: string,
  telRemitente: string,
  telDestinatario: string,
  referencias: string,
  relUsuario: string
) => {
  try {
    await updateDoc(doc(db, "direcciones", id), {
      nombre: nombre,
      apellido: apellido,
      zip: zip,
      estado: estado,
      municipio: municipio,
      colonia: colonia,
      calle: calle,
      NumE: NumE,
      NumI: NumI,
      refCalle1: refCalle1,
      refCalle2: refCalle2,
      tipo: tipo,
      telRemitente: telRemitente,
      telDestinatario: telDestinatario,
      referencias: referencias,
      relUsuario: relUsuario,
    });
  } catch (error) {
    console.error("Error al actualizar la direccion:", error);
  }
};
export const getDirecciones = async (idUser: string) => {
  const result = await getDocs(query(collection(db, 'direcciones'), where('relUsuario', '==', idUser)));
  return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getDireccionById = async (direccionId: string) => {
  const direccionDocRef = doc(db, 'direcciones', direccionId);
  const direccionDocSnapshot = await getDoc(direccionDocRef);
  if (direccionDocSnapshot.exists()) {
    return { id: direccionDocSnapshot.id, ...direccionDocSnapshot.data() };
  } else {
    throw new Error(`No se encontró ninguna dirección con el ID ${direccionId}`);
  }
};

