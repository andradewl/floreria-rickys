//-------------------------------------------- FLORES --------------------------------------------//

interface FlowerWithOferta {
    id: string;
    sku: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    oferta: number;
    existencias:number;
    descuento: number;
    tipoflor:string;
    ocasion:string;
    productosExtra:[];
}

interface FlowerWithoutOferta {
    id: string;
    sku: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    oferta: number;
    existencias:number;
    descuento?: undefined;
    productosExtra?: undefined;
    tipoflor:string;
    ocasion:string;
}


//-------------------------------------------- carrito de compra --------------------------------------------//

interface carritoDeCompra {
    id:string;
    nombre: string;
    precio: number;
    descuento:number;
    imagen:string;
    fecha: string;
    hora: string;
    cantidad:number;
    entrega:string;
    productoExtra: {
        nombreProductoExtra: string;
        precioProductoExtra: number;
    };
    dedicatoria: string | null;
}


//-------------------------------------------- carrito de compra --------------------------------------------//

interface productoExtra {
    id:string;
    nombre: string;
    precio: number;
    imagen:string;
    existencia:number;
}

//-------------------------------------------- login user --------------------------------------------//

interface userLogin {
    id:string;
    name: string;
    email: string;
}


interface Pedido {
    facturacion: {
        nombre: string;
        apellido: string;
        direccion: string;
        colonia: string;
        municipio: string;
        estado: string;
        cp: string;
        email: string;
        telefono: string;
    };
    datosEnvio: {
        nombre: string;
        apellido: string;
        direccion: string;
        colonia: string;
        municipio: string;
        estado: string;
        cp: string;
        email: string;
        telefono: string;
    };
    carritoCompra: carritoDeCompra[];
    idEstado:string;
    uidUserLogin:string,
    entrega:string,
    total:number,

}




interface TipoFlores {
    id: string;
    nombre: string;
}

interface Ocasiones {
    id: string;
    descripcion: string;
    imagen: string;
    nombre: string;
}

interface ProductoApartado {
    idProducto: string;
    cantidad:number;
}


interface NotificacionProps {
    message: string;
}


interface facturacion {
    id:string;
    nombre: string;
    apellidos: string;
    direccion: string;
    colonia: string;
    estado: string;
    municipio: string;
    zip: string;
    email: string;
    telefono: string;
}

interface precioEnvio {
    cp:string;
    envio:string;
    
}

export type Flower = FlowerWithOferta | FlowerWithoutOferta;
export type CarritoDeCompra = carritoDeCompra;
export type ProductoExtra = productoExtra;
export type UserLogin = userLogin;
export type Tipoflores = TipoFlores;
export type Ocasionest = Ocasiones;
export type Productoapartado = ProductoApartado;
export type Notificacionprops = NotificacionProps;
export type facturacionLogin= facturacion;
export type PrecioEnvio= precioEnvio;



export type NuevoPedido = Pedido;