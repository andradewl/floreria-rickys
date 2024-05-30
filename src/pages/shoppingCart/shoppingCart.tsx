import { Grid, Typography, Button, FormControlLabel, Checkbox } from "@mui/material"
import React from "react";
import { CarritoDeCompra } from "../../interfaces/interfaces";
import { useNavigate } from 'react-router-dom';


function ShoppingCart(){
    const navigate = useNavigate()


    const [items, setItems] = React.useState<CarritoDeCompra[]>([]);
    const [isSetItems, setIsSetItems] = React.useState(false);
    const [totalNumerico, setTotalNumerico] = React.useState<number>(0);
    const [totalEnvio, settotalEnvio] = React.useState<number>(500);



    React.useEffect(() => {
        localStorage.setItem('envio',JSON.stringify(500));

        const storedItems = localStorage.getItem('Productos');
        if (storedItems) {
            const parsedItems: CarritoDeCompra[] = JSON.parse(storedItems);
            console.log(parsedItems)
            setItems(parsedItems);
            setIsSetItems(true)
        }else{
            console.log('No hay producto en el carrito');
        }
    }, []);


    React.useEffect(() => {
        let sumaTotal = 0;
            items.forEach((item) => {
                sumaTotal += (item.precio * item.cantidad)+( item.productoExtra.precioProductoExtra);
            })
            setTotalNumerico(sumaTotal);
    }, [items]);


    const eliminarItem = (index: number) => {
        const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
        if (updatedItems.length === 0) {
            localStorage.removeItem('Productos');
            localStorage.removeItem('envio');
            localStorage.removeItem('PrecioApagar');
            setItems([]);
            setIsSetItems(false)
        } else {
            localStorage.setItem('Productos', JSON.stringify(updatedItems));
            setItems(updatedItems);
        }
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            localStorage.setItem('envio', JSON.stringify(0) );
            settotalEnvio(0)
        }else{
            localStorage.setItem('envio',JSON.stringify(500));
            settotalEnvio(500)
        }
    };

    const handleRedirectToShopingProducts = (total:number) => {
        localStorage.setItem('PrecioApagar', JSON.stringify(total));
        navigate('/shopProducts');
    };

    return(
        <>
            <Grid sx={{ position: 'relative', width: '100%', height: '250px' }}>
                <img src='https://flordeluna.com.mx/wp-content/uploads/2023/05/Seccion-contacto-1.webp' alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} />
                <Typography
                    variant="h3"
                    color="initial"
                    sx={{
                    position: 'absolute',
                    top: '50%', // Ajusta la posición vertical del texto
                    left: '50%', // Ajusta la posición horizontal del texto
                    transform: 'translate(-50%, -50%)', // Centra el texto
                    textAlign: 'center', // Alinea el texto al centro
                    color: 'black', // Color del texto
                    padding: '10px', // Espaciado interno del texto (opcional)
                    borderRadius: '5px', // Borde redondeado del fondo del texto (opcional)
                    }}
                >
                    Carrito de compra
                </Typography>
            </Grid>
            <Grid container paddingLeft={'5%'} paddingRight={'5%'} pt={2} pb={2}>
                <Grid item md={8} xs={12}  p={1}>
                    <Grid  p={1}>
                        <Grid>
                            {items.map((item, index) => (
                                <Grid key={index} container sx={{borderRadius:'6px'}} m={1} p={1}>

                                    <Grid item xs={10}>
                                        <Grid container>
                                            <Grid sx={{alignSelf:'center'}}>
                                                <Grid sx={{width:'90px', height:'90px'}}>
                                                    <img src={item.imagen} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover' , borderRadius:'15px'}} />
                                                </Grid>
                                            </Grid>

                                            <Grid m={1}>
                                                <Grid>
                                                    <Typography variant="h6" color="initial" fontSize={17}>{item.nombre}</Typography>
                                                    <Typography variant="h6" color="initial" fontSize={17}>Fecha y hora de entrega: {item.fecha}, {item.hora}</Typography>
                                                    <Button onClick={() => eliminarItem(index)}>
                                                        Eliminar
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid m={1}>
                                            <Typography variant="h6" sx={{color:'#979797de'}} fontSize={14}>Dedicatoria: {item.dedicatoria}</Typography>
                                            <Typography variant="h6"  sx={{color:'#979797de'}} fontSize={14}>Producto Extra: {item.productoExtra.nombreProductoExtra} ${item.productoExtra.precioProductoExtra }</Typography>
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Typography variant="h6" color="initial">x{item.cantidad} $ {(item.precio*item.cantidad) + item.productoExtra.precioProductoExtra} </Typography>
                                    </Grid>
                                </Grid>

                            ))}
                        </Grid>
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
                <Grid item md={4} xs={12}  p={1} >
                    <Grid sx={{ border: '1px solid #afafaf'}} >
                        <Grid sx={{ borderBottom:'1px solid #afafaf', background:'#ececec' }} p={3}>
                            <Typography variant="h6" fontSize={'25px'} fontWeight= {'bold'} color="initial">Resumen de compra</Typography>
                        </Grid>
                        <Grid m={1} ml={3} mr={3} pb={1} sx={{ borderBottom:'1px solid #afafaf'}}>
                            <Typography variant="h6" color="initial">Productos: ${totalNumerico}</Typography>
                        </Grid>
                        <Grid m={1} ml={3} mr={3} pb={1} sx={{ borderBottom:'1px solid #afafaf'}}>
                            <Typography variant="h6" color="initial">Envio: ${totalEnvio}</Typography>
                        </Grid>
                        <Grid m={1} ml={3} mr={3} pb={1} sx={{ borderBottom:'1px solid #afafaf'}}>
                            <FormControlLabel control={<Checkbox onChange={handleCheckboxChange}/>} label="Recoge en tienda" />
                        </Grid>
                        <Grid m={1} ml={3} mr={3} pb={1} sx={{ borderBottom:'1px solid #afafaf'}}>
                            <Typography variant="h6" color="initial">Total: ${totalNumerico + totalEnvio}</Typography>
                        </Grid>
                        <Grid sx={{textAlign:'center'}} m={1} ml={3} mr={3}>
                            <Button onClick={()=>handleRedirectToShopingProducts(totalNumerico + totalEnvio)}
                            disabled={!isSetItems}
                            >
                                Completar Compra
                            </Button>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export default ShoppingCart