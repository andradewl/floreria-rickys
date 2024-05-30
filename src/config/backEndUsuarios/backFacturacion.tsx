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

export const addDirFact = (
  nombre: string,
  apellido: string,
  empresa: string,
  pais: string,
  zip: string,
  estado: string,
  municipio: string,
  colonia: string,
  calle: string,
  NumE: string,
  NumI: string,
  refCalle1: string,
  refCalle2: string,
  telefono: string,
  email: string,
  relUsuario: string
) => {
  addDoc(collection(db, "dirFacturacion"), {
    nombre,
    apellido,
    empresa,
    pais,
    zip,
    estado,
    municipio,
    colonia,
    calle,
    NumE,
    NumI,
    refCalle1,
    refCalle2,
    telefono,
    email,
    relUsuario,
  });
};

export const getDirFact = async (id: string) => {
  const result = await getDocs(query(collection(db, "dirFacturacion", id)));
  return result;
};

export const deleteDirFact = async (id: string) => {
  try {
    await deleteDoc(doc(db, "dirFacturacion", id));
    console.log("dirección eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar direccion:", error);
    throw error;
  }
};


export const getDireccionesUsuario = async (idUser: string) => {
  const result = await getDocs(
    query(collection(db, "dirFacturacion"), where("relUsuario", "==", idUser))
  );
  return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDireccionFacturacionById = async (id: string) => {
  try {
    const docSnap = await getDoc(doc(db, "dirFacturacion", id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No existe ninguna dirección de facturación con el ID proporcionado.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la dirección de facturación:", error);
    throw error;
  }
};

export const updateDireccionFacturacion = async (
  id: string,
  nombre: string,
  apellido: string,
  empresa: string,
  pais: string,
  zip: string,
  estado: string,
  municipio: string,
  colonia: string,
  calle: string,
  NumE: string,
  NumI: string,
  refCalle1: string,
  refCalle2: string,
  telefono: string,
  email: string // Agregar este argumento que falta
) => {
  try {
    await updateDoc(doc(db, "dirFacturacion", id), {
      nombre: nombre,
      apellido: apellido,
      empresa: empresa,
      pais: pais,
      zip: zip,
      estado: estado,
      municipio: municipio,
      colonia: colonia,
      calle: calle,
      NumE: NumE,
      NumI: NumI,
      refCalle1: refCalle1,
      refCalle2: refCalle2,
      telefono: telefono,
      email: email,
    });
  } catch (error) {
    console.error("Error al actualizar la dirección de facturación:", error);
    throw error;
  }
};


