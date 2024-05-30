import { db, storage } from "../firfebase"; // Importa la instancia de Firestore y Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importa los métodos necesarios de Firebase Storage
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  where,
} from "firebase/firestore";

// Función para obtener todos los productos de la colección "Flores"
export const obtenerProductos = async () => {
  try {
    const result = await getDocs(collection(db, "Flores"));
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Función para obtener productos por campo
export const obtenerProductosPorCampo = async (campo: string, valor: string) => {
  try {
    const result = await getDocs(
      query(collection(db, "Flores"), where(campo, "==", valor))
    );
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener los productos por campo:", error);
    throw error;
  }
};

// Función para eliminar un producto de la colección "Flores"
export const eliminarProducto = async (idProducto: string) => {
  try {
    await deleteDoc(doc(db, "Flores", idProducto));
    // console.log("Producto eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// Función para obtener un producto por su ID
export const obtenerProductoPorId = async (idProducto: string) => {
  try {
    const productoDocRef = doc(db, "Flores", idProducto);
    const productoDocSnapshot = await getDoc(productoDocRef);
    if (productoDocSnapshot.exists()) {
      return { id: productoDocSnapshot.id, ...productoDocSnapshot.data() };
    } else {
      throw new Error(`No se encontró ningún producto con el ID ${idProducto}`);
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID: ", error);
    throw new Error("Error al obtener el producto por ID");
  }
};

export const agregarProducto = async (
  descripcion: string,
  descuento: number,
  existencias: number,
  nombre: string,
  precio: number, // Agregar precio aquí
  imagenURL: string // Agregar la URL de la imagen
) => {
  try {
    await addDoc(collection(db, "Flores"), {
      descripcion,
      descuento,
      existencias,
      nombre,
      precio, // Asegurarse de incluir el precio
      imagen: imagenURL // Guardar la URL de la imagen
    });

    // console.log("Producto agregado correctamente");
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
};


// Función para subir una imagen a Firebase Storage y obtener la URL de descarga
export const subirImagen = async (idProducto: string, imagenFile: File) => {
  try {
    const storageRef = ref(storage, `productos/${idProducto}/${imagenFile.name}`);
    const uploadTaskSnapshot = await uploadBytes(storageRef, imagenFile);
    const imagenURL = await getDownloadURL(uploadTaskSnapshot.ref);
    return imagenURL;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};

// Función para actualizar un producto de la colección "Flores"
export const actualizarProducto = async (
  idProducto: string,
  descripcion: string,
  descuento: number,
  existencias: number,
  nombre: string,
  precio: number,
  imagenFile: File // Agregar la imagen como un argumento adicional
) => {
  try {
    // Subir la nueva imagen a Firebase Storage y obtener la URL de la imagen
    const imagenURL = await subirImagen(idProducto, imagenFile);

    // Actualizar el documento del producto en Firestore con la nueva URL de la imagen
    await updateDoc(doc(db, "Flores", idProducto), {
      descripcion,
      descuento,
      existencias,
      nombre,
      precio,
      imagen: imagenURL // Actualizar la URL de la imagen en Firestore
    });

    // console.log('Producto actualizado correctamente con nueva imagen');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};
