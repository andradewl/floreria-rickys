/* eslint-disable no-constant-condition */
// import { Anchor } from "@mui/icons-material";
import { Button, Grid, Toolbar, Typography } from "@mui/material"
import React from "react";
import { useNavigate } from "react-router-dom";
import { CarritoDeCompra } from "../interfaces/interfaces";
// import { useNavigate,   } from 'react-router-dom';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

import { getexistenciaProductById } from "../config/apiFirebase";
import { NotificacionInfo, NotificacionSuccess, Notificacionerror } from "./Alert";

function ShopingCarNav() {
    // const location = useLocation();

    const [notiError, setNotiError ] = React.useState(false);
    const [notiSucces, ] = React.useState(false);
    const [notiInfo, ] = React.useState(false);
    const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

    const anchor='right'

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const navigate = useNavigate()


    const [items, setItems] = React.useState<CarritoDeCompra[]>([]);
    // const [, setItemsRespaldo] = React.useState<CarritoDeCompra[]>([]);
    const [isSetItems, setIsSetItems] = React.useState(false);
    const [totalNumerico, setTotalNumerico] = React.useState<number>(0);
    const [actializarCarrito, setActializarCarrito] = React.useState(false);
    // const [totalEnvio, settotalEnvio] = React.useState<number>(500);

    React.useEffect(() => {
        let sumaTotal = 0;
            items.forEach((item) => {
                sumaTotal += (item.precio * item.cantidad)+( item.productoExtra.precioProductoExtra);
            })
            setTotalNumerico(sumaTotal);
    }, [items]);


    React.useEffect(() => {
        localStorage.setItem('envio',JSON.stringify(500));

        const storedItems = localStorage.getItem('Productos');
        if (storedItems) {
            const parsedItems: CarritoDeCompra[] = JSON.parse(storedItems);
            console.log(parsedItems)
            setItems(parsedItems);
            // setItemsRespaldo(parsedItems)
            setIsSetItems(true)
        }
        // else{
        //     console.log('No hay producto en el carrito');
        // }
    }, []);


    const eliminarItem = (index: number) => {
        const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
        if (updatedItems.length === 0) {
            localStorage.removeItem('Productos');
            localStorage.removeItem('envio');
            localStorage.removeItem('precioTotal');
            setItems([]);
            setIsSetItems(false)
        } else {
            // localStorage.setItem('Productos', JSON.stringify(updatedItems));
            setItems(updatedItems);
        }
        // const rutaActual = location.pathname
        // window.location.href = rutaActual
        setActializarCarrito(true)
    };


    const handleRedirectToShopingProducts = (total:number) => {
        localStorage.setItem('precioTotal', JSON.stringify(total));
        navigate('/shopProducts');
    };


    const toggleDrawer = (anchor: Anchor, open: boolean) =>(event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        
        setState({ ...state, [anchor]: open });
        
    };

    const actualizarCarritoHandle = (total:number) =>{
        localStorage.setItem('Productos', JSON.stringify(items));
        localStorage.setItem('precioTotal', JSON.stringify(total));
        window.location.href = '/shopProducts';
    }


    const añadirMasProductos = async(id:string)=>{
        const index = items.findIndex(item => item.id === id);

        if (index !== -1) {
            const nuevaCantidad = items[index].cantidad + 1;
            const dataExistencia = await getexistenciaProductById(id)
            if(dataExistencia){
                if(dataExistencia.existencias == nuevaCantidad){
                    setMensajeNotificacion("maxima existencia")
                    setNotiError(true)
                    setTimeout(() => {
                        setNotiError(false)
                    }, 2000);
                    // alert("maxima existencia")
                }else{
                    const updatedItem = {
                        ...items[index],
                        cantidad: nuevaCantidad
                    };
                    const updatedItems = [
                        ...items.slice(0, index),
                        updatedItem,
                        ...items.slice(index + 1)
                    ];
                    setItems(updatedItems);
                }
            }
            setActializarCarrito(true)
        }
    }


    const quitarProductos=(id:string)=>{
        const index = items.findIndex(item => item.id === id);

        if (index !== -1) {
            const nuevaCantidad = items[index].cantidad - 1;
            if(nuevaCantidad <= 1){
                const updatedItem = {
                    ...items[index],
                    cantidad: 1
                };
                const updatedItems = [
                    ...items.slice(0, index),
                    updatedItem,
                    ...items.slice(index + 1)
                ];
                setItems(updatedItems);
                setActializarCarrito(true)
            }else{
                const updatedItem = {
                    ...items[index],
                    cantidad: nuevaCantidad
                };
                const updatedItems = [
                    ...items.slice(0, index),
                    updatedItem,
                    ...items.slice(index + 1)
                ];
                setItems(updatedItems);
                setActializarCarrito(true)
            }
        }
    }

    return(
        <>
            <Grid
                // sx={{ width: anchor == 'top' || anchor == 'bottom' ? 'auto' : {xs:350, md:450} }}
                sx={{ width: {xs:'350px', md:'450px'}, height:'100vh' }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)}
            >
                <Grid sx={{width:'100%', height:'100%'}}>
                    <Grid sx={{width:'100%',  paddingBottom:'200px'}} >
                        <Typography variant="h1" color="initial"
                        sx={{
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                            fontSize:'30px'
                        }} pl={'5%'} pt={'2%'} pb={'2%'}
                        >Carrito</Typography>

                        <Toolbar sx={{display:'block'}}>
                            {items && items.map((item, index) => (
                                <Grid container sx={{
                                    borderBottomWidth: '1px',
                                    borderBottomColor: '#80808040',
                                    borderBottomStyle: 'solid',

                                }}  pt={1}>
                                    <Grid item xs={3} sx={{height:'90px' }}>
                                        <img src={item.imagen} alt="" style={{width:'90%', height:'100%', borderRadius:'10px'}}/>
                                    </Grid>
                                    <Grid item xs={9} p={1}>
                                        <Grid container >
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontSize:'13px'
                                                }}
                                                >{item.nombre }</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end',
                                                    fontWeight: "bold",

                                                }}
                                                >x{item.cantidad } ${item.precio}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontWeight: "bold",
                                                    color:'#6a6a6a',
                                                    fontStyle: "normal",
                                                    fontSize:'12px'
                                                }}
                                                >Entrega</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end'
                                                }}
                                                >{item.entrega}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    color:'#6a6a6a',
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    fontSize:'12px'
                                                }}
                                                >Fecha</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                            <Typography variant="body2" color="initial"
                                            sx={{
                                                fontSize:'12px',
                                                textAlign:'end'
                                            }}
                                            >
                                                {item.fecha } - {item.hora }
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    color:'#6a6a6a',
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    fontSize:'12px'
                                                }}
                                                >Producto Extra</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <Typography variant="body2" color="initial"
                                            sx={{
                                                fontSize:'12px',
                                                textAlign:'end'
                                            }}
                                            >
                                                {item.productoExtra.nombreProductoExtra }
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    color:'#6a6a6a',
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    fontSize:'12px'
                                                }}
                                                >Precio Producto Extra</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                            <Typography variant="body2" color="initial"
                                            sx={{
                                                fontSize:'12px',
                                                textAlign:'end'
                                            }}
                                            >
                                                ${item.productoExtra.precioProductoExtra }
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container sx={{marginBottom:'10px'}}>
                                            <Grid item xs={4}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    color:'#6a6a6a',
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    fontSize:'12px'
                                                }}
                                                >Dedicatoria</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontFamily: "Cormorant",
                                                    fontOpticalSizing: "auto",
                                                    fontWeight: "<weight>",
                                                    fontStyle: "normal",
                                                    fontSize:'15px',
                                                    textAlign:'end'
                                                }}
                                                >
                                                    {item.dedicatoria }
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} sx={{
                                        borderBlockWidth: '1px',
                                        borderBottomColor: '#dadada',
                                        borderBottomStyle: 'double'
                                    }}>
                                        <Grid container>
                                            <Grid item xs={6} >
                                                <Grid sx={{display:'flex'}}>
                                                    <Button onClick={()=>quitarProductos(item.id)}>
                                                        -
                                                    </Button>
                                                        <Typography variant="subtitle1" color="initial">{item.cantidad }</Typography>
                                                    <Button onClick={()=>añadirMasProductos(item.id)}>
                                                        +
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} sx={{textAlign:'end'}}>
                                                <Button variant="text" onClick={() => eliminarItem(index)}>
                                                {/* <Button variant="text">  */}
                                                    Eliminar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            ))}

                        </Toolbar>
                    </Grid>
                    <Grid sx={{width:{xs:'350px', md:'450px'}, backgroundColor:'#fee7ea', alignContent:'center', padding:'2%', position: 'fixed', bottom: '0px'}} >
                    {/* <Typography variant="h1" color="initial">adios</Typography> */}
                        <Grid container mt={3} mb={3} sx={{maxWidth:'100%'}}>
                            <Grid item xs={8}>
                                <Typography variant="body1" color="initial" sx={{fontWeight: "bold",}}>Subtotal</Typography>
                                <Typography variant="body2" color="initial">Precios sujetos a cambios sin previo aviso.</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" color="initial"  sx={{textAlign:'end'}}>
                                ${totalNumerico}
                                </Typography>
                            </Grid>
                        </Grid>

                        {
                            actializarCarrito  ? (
                                <Button sx={{ width:"100%", backgroundColor:'black', color:'white'}} onClick={()=>actualizarCarritoHandle(totalNumerico)} disabled={!isSetItems}>
                                    Actualizar y Completar pedido
                                </Button>
                            ):(
                                <Button sx={{ width:"100%", backgroundColor:'black', color:'white'}} onClick={()=>handleRedirectToShopingProducts(totalNumerico)} disabled={!isSetItems}>
                                    Completar pedido
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            {notiError &&
                <Notificacionerror message={mensajeNotificacion}/>
            }

            {notiSucces &&
                <NotificacionSuccess message={mensajeNotificacion}/>
            }

            {notiInfo &&
                <NotificacionInfo message={mensajeNotificacion}/>
            }
        </>
    )
}

export default ShopingCarNav