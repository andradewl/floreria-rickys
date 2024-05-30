/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';

import { Box, Grid, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Drawer } from '@mui/material';
import { useParams } from 'react-router-dom';
import { stylesComponents } from '../../styles/stylesComponentes';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import dayjs, { Dayjs } from 'dayjs'; // Asegúrate de importar Dayjs desde 'dayjs'
import { apartarProducto, getProductById, getProductsExtraByIds } from '../../config/apiFirebase';
import { Flower, CarritoDeCompra, ProductoExtra } from '../../interfaces/interfaces'

import { setLocalStorage, getLocalStorage } from '../../config/LocalStorage'
// import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShopingCarNav from '../../components/ShopingCarNav';
import Carga from '../../components/Carga';
import { NotificacionInfo } from '../../components/Alert';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function ProductId(){
    // const navigate = useNavigate()
    const { id } = useParams();
    const theme = useTheme();
    // const navigate = useNavigate()

    const [product, setProduct] = React.useState<Flower | null>(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [carritoDeCompra, setCarritoDeCompra] = React.useState<CarritoDeCompra[]>([]);
    const [visibleHora1, setVisibleHora1] = React.useState(true)
    const [visibleHora2, setVisibleHora2] = React.useState(true)
    const [visibleHora3, setVisibleHora3] = React.useState(true)
    const [visibleHorarios, setVisibleHorarios] = React.useState(false)
    const [date, setDate] = React.useState(dayjs());
    const [hora, sethora] = React.useState('');
    const [productoExtra, setproductoExtra] = React.useState({nombreProductoExtra: 'Sin producto extra',precioProductoExtra: 0});
    const [dedicatoria, setDedicatoria] = React.useState('');
    const [visibleProductoExtra, setvisibleProductoExtra] = React.useState(false) //muestra los productos extras
    const [isProductoExtraEmpty, setisProductoExtraEmpty] = React.useState(true) //comprueba si hay producto extra ya seleccionado
    const [changeProductExtra, setChangeProductExtra] = React.useState(true) //comprueba si hay producto extra ya seleccionado
    const [habilitarDesabilitarBottonCompra, setHabilitarDesabilitarBottonCompra] = React.useState(false)
    const [productosExtra, setProductosExtras] = React.useState<ProductoExtra[]>([]);
    // const [cantidadProducto, setcantidadProducto] = React.useState(1);
    const [dataInfoAddShoppingCard1,setdataInfoAddShoppingCard1] = React.useState(true)
    // const [dataInfoAddShoppingCard2,setdataInfoAddShoppingCard2] = React.useState(false)
    const [dataInfoAddShoppingCard2,setdataInfoAddShoppingCard2] = React.useState(false)
    const [dataInfoAddShoppingCard3,setdataInfoAddShoppingCard3] = React.useState(false)
    const [dataInfoAddShoppingCard4,setdataInfoAddShoppingCard4] = React.useState(false)
    // const [dataInfoAddShoppingCard5,setdataInfoAddShoppingCard5] = React.useState(false)

    const [opcion1entrega,setOpcion1entrega] = React.useState(true)
    const [opcion2entrega,setOpcion2entrega] = React.useState(false)
    const [entrega, setEntrega] = React.useState('En tienda')


    const [cambiarProductoExtra, ] = React.useState(true)
    const [eliminarProductoExtra, ] = React.useState(false)

    const [notiInfo, setNotiInfo] = React.useState(false);
    const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

    let maxSteps = productosExtra.length

    React.useEffect(() => {
        getDataCarShopping()
        fetchProduct()
    }, []);

    React.useEffect(() => {
        maxSteps = productosExtra.length;
        console.log(maxSteps)
    }, [productosExtra]);

    React.useEffect(() => {
        // const algunDatoPresente = !!productoExtra && dedicatoria != '' && !!hora && productoExtra.nombreProductoExtra !='Sin producto extra' && productoExtra.precioProductoExtra != 0;
        const algunDatoPresente = !!hora && entrega;

        if (algunDatoPresente) {
            setHabilitarDesabilitarBottonCompra(true)
        } else {
            setHabilitarDesabilitarBottonCompra(false)
        }
    }, [productoExtra, dedicatoria, hora]);

    React.useEffect(() => {
        setDedicatoria(dedicatoria)
        console.log(dedicatoria)
    }, [dedicatoria]);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

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

    const changeDataAddShoppingCard = (data:number) => {

        if(data ==1 ){
            setdataInfoAddShoppingCard1(true)
            setdataInfoAddShoppingCard2(false)
            setdataInfoAddShoppingCard3(false)
            setdataInfoAddShoppingCard4(false)
            
        }
        if(data ==2 ){
            setdataInfoAddShoppingCard1(false)
            setdataInfoAddShoppingCard2(true)
            setdataInfoAddShoppingCard3(false)
            setdataInfoAddShoppingCard4(false)
            
        }
        if(data ==3 ){
            setdataInfoAddShoppingCard1(false)
            setdataInfoAddShoppingCard2(false)
            setdataInfoAddShoppingCard3(true)
            setdataInfoAddShoppingCard4(false)
            
        }
        if(data ==4 ){
            setdataInfoAddShoppingCard1(false)
            setdataInfoAddShoppingCard2(false)
            setdataInfoAddShoppingCard3(false)
            setdataInfoAddShoppingCard4(true)
            
        }
        if(data ==5 ){
            setdataInfoAddShoppingCard1(false)
            setdataInfoAddShoppingCard2(false)
            setdataInfoAddShoppingCard3(false)
            setdataInfoAddShoppingCard4(false)
            
        }
    };

    const fetchProducExtra = async (dataProductsExtra:[]) =>{
        const data= await getProductsExtraByIds(dataProductsExtra)
        console.log(data)
        setProductosExtras(data);
    }


    const getDataCarShopping=()=>{
        const localstoorageArray = getLocalStorage('Productos')
        setCarritoDeCompra(localstoorageArray)
    }

    const fetchProduct = async () => {
        try {
            const idProducto=String(id)
            const productData = await getProductById(idProducto);
            console.log(productData?.productosExtra)
            if(productData?.productosExtra){
                fetchProducExtra(productData.productosExtra)
            }
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching flowers:', error);
        }
    };

    const handleChangeDedicatoria = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if(event.target.value == ''){
            setDedicatoria('');
        }else{
            setDedicatoria(event.target.value);
        }
    };

    const handleChangehour = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        sethora(event.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDateValidation = (newDate: Dayjs | null) => {
        if (newDate) {
            const formattedNewDate = newDate.format('DD-MM-YYYY');
            const today = dayjs().format('DD-MM-YYYY');
            console.log(formattedNewDate === today )

            if (formattedNewDate === today) {
                const horaEstablecida1 = dayjs('10:00:00', 'HH:mm:ss');
                const horaEstablecida2 = dayjs('12:00:00', 'HH:mm:ss');
                const horaEstablecida3 = dayjs('18:00:00', 'HH:mm:ss');
                const horaActual = dayjs();
                console.log(horaActual.isBefore(horaEstablecida1), horaActual.isBefore(horaEstablecida2),horaActual.isBefore(horaEstablecida3))

                setVisibleHora1(horaActual.isBefore(horaEstablecida1));
                setVisibleHora2(horaActual.isBefore(horaEstablecida2));
                setVisibleHora3(horaActual.isBefore(horaEstablecida3));
            } else {
                setVisibleHora1(true);
                setVisibleHora2(true);
                setVisibleHora3(true);
            }

            setDate(newDate);
            setVisibleHorarios(true);


        }

    };

    const handleVisibleProductoExtra = () =>{
        setvisibleProductoExtra(true)
    }

    const handleVisibleProductoExtra2 = () =>{
        if(!isProductoExtraEmpty){
            setChangeProductExtra(false)
            setvisibleProductoExtra(true)
        }else{
            setChangeProductExtra(true)
            setvisibleProductoExtra(false)
        }
    }

    const guardarProductoExtra = (nombre: string, precio: number)=>{
        setproductoExtra({
            nombreProductoExtra: nombre,
            precioProductoExtra: precio,
        });
        setvisibleProductoExtra(false)
        setisProductoExtraEmpty(false)
        setChangeProductExtra(false)
    }


    const guardarDatosConDescuento = async(id:string,nombre: string, precio: number, descuento: number, imagen:string)=>{
        const dataApartado= await apartarProducto(id, 1)
        const newItem: CarritoDeCompra = {
            id:id,
            nombre: nombre,
            precio: precio,
            descuento:descuento,
            imagen:imagen,
            fecha: date.format('DD-MM-YYYY'),
            hora: hora,
            cantidad:1,
            entrega:entrega,
            productoExtra: productoExtra ? {
                nombreProductoExtra: productoExtra.nombreProductoExtra,
                precioProductoExtra: productoExtra.precioProductoExtra,
            } : {
                nombreProductoExtra: 'Sin producto Extra',
                precioProductoExtra: 0,
            },
            dedicatoria:dedicatoria
        };
        // apartarProducto(newItem.id, newItem.cantidad)
        setMensajeNotificacion('Agregando producto al carrito...');
        setNotiInfo(true)
        // console.log
        const updatedCarritoDeCompra = [...carritoDeCompra, newItem];
        setCarritoDeCompra(updatedCarritoDeCompra);
        setLocalStorage('Productos', updatedCarritoDeCompra);
        if(dataApartado){
            setTimeout(() => {
                window.location.href = '/shopProducts';
          }, 5000);
        }
    }

    const guardarDatos =async (id:string,nombre: string, precio: number, imagen:string)=>{
        const dataApartado= await apartarProducto(id, 1)
        const newItem: CarritoDeCompra = {
            id:id,
            nombre: nombre,
            precio: precio,
            descuento:0,
            imagen:imagen,
            fecha: date.format('DD-MM-YYYY'),
            hora: hora,
            cantidad:1,
            entrega:entrega,
            productoExtra: productoExtra ? {
                nombreProductoExtra: productoExtra.nombreProductoExtra,
                precioProductoExtra: productoExtra.precioProductoExtra,
            } : {
                nombreProductoExtra: 'Sin producto Extra',
                precioProductoExtra: 0,
            },
            dedicatoria: dedicatoria,
        };

        setMensajeNotificacion('Agregando producto al carrito...');
        setNotiInfo(true)
        // Si el producto no está en el carrito, lo agregamos
        const updatedCarritoDeCompra = [...carritoDeCompra, newItem];
        // apartarProducto(newItem.id, newItem.cantidad)
        setCarritoDeCompra(updatedCarritoDeCompra);
        setLocalStorage('Productos', updatedCarritoDeCompra);
        // apartarProducto(newItem.id, newItem.cantidad)
        // navigate('/shoppingCart');

        if(dataApartado){
            setTimeout(() => {
                window.location.href = '/shopProducts';
            }, 5000);
        }
    }


    const canbiarProductoExtra= () =>{
        setChangeProductExtra(true)
        setvisibleProductoExtra(true)
    }

    const eliminarProducto = () =>{
        setproductoExtra({nombreProductoExtra:'Sin producto extra', precioProductoExtra:0})
        setvisibleProductoExtra(false)
        setisProductoExtraEmpty(true)
        setChangeProductExtra(true)
    }

    const cambiarOpcionDeEntrega=(entrega:string, opcion:number)=>{
        if(opcion == 1){
            setOpcion1entrega(true)
            setOpcion2entrega(false)
        }
        if(opcion == 2){
            setOpcion1entrega(false)
            setOpcion2entrega(true)
        }
        setEntrega(entrega)
    }

    // const cambiarOpcionCambioProductoExtra=(opcion:number)=>{
    //     if(opcion == 1){
    //         setCambiarProductoExtra(true)
    //         setEliminarProductoExtra(false)
    //     }
    //     if(opcion == 2){
    //         setCambiarProductoExtra(false)
    //         setEliminarProductoExtra(true)
    //     }
    // }

    if (!product) {
        return <Carga />;
    }

    return(
        <>
            <Grid sx={{ paddingTop:10, paddingLeft:{xs:5, md:8, lg:10, xl:25}, paddingRight:{xs:5, md:8, lg:10, xl:25}, backgroundColor:'#f5f1ec'}}>
                <Grid container>
                    <Grid item md={7} xs={12} sx={{justifyContent:'center'}}>
                        <Grid container>
                            <Grid item xs={3} sx={{textAlign:'center', display:{xs:'none', md:'block'}}}>
                                <img src={product.imagen} alt="" style={{ width:'70%', height:'140px', borderRadius:'8px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'70%', height:'140px', borderRadius:'8px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'70%', height:'140px', borderRadius:'8px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'70%', height:'140px', borderRadius:'8px' }}/>
                            </Grid>
                            <Grid item xs={12} md={9} sx={{width:'100%', height:{xs:'300px', sm:'450px', md:'400px', lg:'500px', xl:'650px'}}}>
                                <img src={product.imagen} alt="" style={{ width:'100%', height:'100%', borderRadius:'8px' }}/>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign:'center', display:{xs:'flex', md:'none'}}}>
                                <img src={product.imagen} alt="" style={{ width:'60px', height:'60px', borderRadius:'8px', margin:'4px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'60px', height:'60px', borderRadius:'8px', margin:'4px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'60px', height:'60px', borderRadius:'8px', margin:'4px' }}/>
                                <img src={product.imagen} alt="" style={{ width:'60px', height:'60px', borderRadius:'8px', margin:'4px' }}/>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item md={5} xs={12} sx={{ paddingLeft:{lg: 5, md:2, xs:0}, paddingRight:{md:5, xs:0} }}>
                        <Grid>
                            <Typography variant="h1" color="initial" sx={{
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:'30px'
                            }} p={1}>{product.nombre}</Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="initial" sx={{ color:'#525252',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:'15px'
                            }}
                            p={1}
                            >
                                SKU: {product.sku}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="initial" sx={{ color:'#525252',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:'15px'
                            }}
                            p={1}
                            >
                                Existencias: {product.existencias }
                            </Typography>
                        </Grid>

                        {/* <Grid>
                            <Rating name="read-only" value={4} readOnly />
                        </Grid> */}
                        <Grid>
                            <Typography variant="subtitle1" color="initial" p={1}
                            sx={{
                                fontStyle: "normal",
                                fontSize:'17px'
                            }
                            }
                            >{product.descripcion}</Typography>
                        </Grid>

                        {
                            product.descuento ?
                            (
                                <Grid>
                                    <Typography variant="subtitle1" color="initial" p={1}>
                                        <Box display={'flex'}>
                                            <Typography variant="h2" color="initial"  fontSize={20} style={{color:'red', textAlign:'start', width:'50%',  textDecorationLine: 'line-through',
                                                fontWeight: "bold",
                                                fontStyle: "normal"
                                            }}>${product.precio}</Typography>
                                            <Typography variant="h2" color="initial"  fontSize={20} style={{color:'#fb7185', textAlign:'end', width:'50%',
                                                fontStyle: "normal",
                                            }}>${product.descuento}</Typography>
                                        </Box>
                                    </Typography>
                                </Grid>
                            )
                            :
                            (
                                <Grid>
                                    <Typography variant="subtitle1" color="initial" p={1}>
                                        <Box display={'flex'}>
                                            <Typography variant="h2" color="initial"  fontSize={20} style={{color:'#fb7185', textAlign:'start', width:'50%',fontStyle: "normal"
                                            }}>${product.precio}</Typography>
                                        </Box>
                                    </Typography>
                                </Grid>
                            )
                        }
                                <Grid sx={{paddingTop:{  md:2, xs:1}}}>
                                    {/* Donde recoger */}
                                    <Grid m={2}>
                                        <Grid sx={{display:'flex', color:'#fb7185'}} onClick={()=>changeDataAddShoppingCard(1)}>
                                            <CheckCircleIcon sx={{width:'20px', height:'auto'}}/>
                                            <Typography variant="h6" color="#fb7185" fontSize={'16px'}>¿Para enviar o recoger? </Typography>{dataInfoAddShoppingCard1 ? <Typography sx={{ fontWeight:'bold' }}> - </Typography> : <Typography sx={{ fontWeight:'bold' }}> + </Typography>}
                                        </Grid>
                                        {dataInfoAddShoppingCard1 &&
                                            <Grid container>
                                                <Grid item xs={12} sx={{margin:'5px'}}>
                                                    <Button key="one"
                                                        sx={opcion1entrega ? stylesComponents.botonRecogerProductoOpcion1:stylesComponents.botonRecogerProductoOpcion2}
                                                        onClick={()=>{cambiarOpcionDeEntrega('En tienda', 1), changeDataAddShoppingCard(2)}}
                                                    >
                                                        <Typography variant="h1" color="initial" fontSize={12}
                                                            sx={opcion1entrega ? stylesComponents.botontipografia1RecogerProductoOpcion1:stylesComponents.botontipografia1RecogerProductoOpcion2}
                                                        >Recoger en tienda</Typography>
                                                        <Typography variant="body1" color="initial" fontSize={12}
                                                            sx={opcion1entrega ? stylesComponents.botontipografia2RecogerProductoOpcion1:stylesComponents.botontipografia2RecogerProductoOpcion2}
                                                        >Sin costo adicional</Typography>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sx={{margin:'5px'}}>
                                                    <Button key="two"
                                                        sx={opcion2entrega ? stylesComponents.botonRecogerProductoOpcion1:stylesComponents.botonRecogerProductoOpcion2}
                                                        onClick={()=>{cambiarOpcionDeEntrega('A domicilio', 2), changeDataAddShoppingCard(2)}}
                                                    >
                                                        <Typography variant="h1" color="initial" fontSize={12}
                                                            sx={opcion2entrega ? stylesComponents.botontipografia1RecogerProductoOpcion1:stylesComponents.botontipografia1RecogerProductoOpcion2}
                                                        >Enviar a domicilio</Typography>
                                                        <Typography variant="body1" color="initial" fontSize={12}
                                                            sx={opcion2entrega ? stylesComponents.botontipografia2RecogerProductoOpcion1:stylesComponents.botontipografia2RecogerProductoOpcion2}
                                                        >Con costo adicional</Typography>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid m={2}>
                                        <Grid sx={{display:'flex', color:'#fb7185'}} onClick={()=>changeDataAddShoppingCard(2)}>
                                            <CheckCircleIcon sx={{width:'20px', height:'auto'}}/>
                                            <Typography variant="h6" color="#fb7185" fontSize={'16px'}> Elije una Fecha y hora de entrega</Typography> {dataInfoAddShoppingCard2 ? <Typography sx={{ fontWeight:'bold' }}> - </Typography> : <Typography sx={{ fontWeight:'bold' }}> + </Typography>}
                                        </Grid>
                                        {dataInfoAddShoppingCard2 &&
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{justifyContent:'center', width:'100%'}}>
                                                    <DatePicker sx={{justifyContent:'center', width:'100%'}}
                                                        value={date}
                                                        onChange={(newDate)=>handleDateValidation(newDate)}
                                                        disablePast
                                                    />
                                                </DemoContainer >
                                            </LocalizationProvider>
                                        }
                                    </Grid>
                                    {/* Hora de entrega */}
                                    <Grid  m={2}>
                                        {dataInfoAddShoppingCard2 && visibleHorarios &&
                                            <FormControl sx={{width:'100%', textalign:'center'}} >
                                                <InputLabel id="demo-simple-select-label">Hora de entrega</InputLabel>
                                                <Select
                                                    required
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Age"
                                                    onChange={handleChangehour}

                                                >
                                                    {visibleHora1 && <MenuItem value={'8:00 AM - 12:00 PM'}>8:00 AM - 12:00 PM</MenuItem>}
                                                    {visibleHora2 && <MenuItem value={'12:00 PM - 4:00 PM'}>12:00 PM - 4:00 PM</MenuItem>}
                                                    {visibleHora3 && <MenuItem value={'4:00 PM - 8:00 PM'}>4:00 PM - 8:00 PM</MenuItem>}
                                                </Select>
                                            </FormControl>
                                        }
                                    </Grid>

                                    {/* Producto Extra */}
                                    {
                                        productosExtra.length > 0 &&
                                        <>
                                            {changeProductExtra ?
                                                (
                                                    <>
                                                        <Grid  m={2}>
                                                                <Grid sx={{display:'flex', color:'#fb7185'}} onClick={()=>changeDataAddShoppingCard(3)}>
                                                                    <CheckCircleIcon sx={{width:'20px', height:'auto'}}/>
                                                                    <Typography variant="h6" color="#fb7185" fontSize={'16px'}> Producto Extra</Typography>{dataInfoAddShoppingCard3 ? <Typography sx={{ fontWeight:'bold' }}> - </Typography> : <Typography sx={{ fontWeight:'bold' }}> + </Typography>}
                                                                </Grid>
                                                            { visibleProductoExtra ?
                                                                (
                                                                    <Typography component={Button} variant="h6" color="#fb7185" fontSize={'16px'} onClick={handleVisibleProductoExtra2} sx={stylesComponents.botonRecogerProductoOpcion2} p={1}>Cancelar</Typography>
                                                                ):(
                                                                    dataInfoAddShoppingCard3 && <Typography component={Button} variant="h6" color="#fb7185" fontSize={'16px'} onClick={handleVisibleProductoExtra} sx={stylesComponents.botonRecogerProductoOpcion1}>Añadir Producto Extra</Typography>
                                                                )
                                                            }
                                                        </Grid>
                                                        {visibleProductoExtra && dataInfoAddShoppingCard3 &&
                                                            <Grid m={2} sx={{textAlign:'center'}}>
                                                                <Grid sx={{ Width: '100%'}}>
                                                                    <Grid  xs={12}>
                                                                        <Grid>
                                                                            <Grid
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                }}
                                                                            >
                                                                                <Button  sx={stylesComponents.button} onClick={() =>  guardarProductoExtra(productosExtra[activeStep].nombre, productosExtra[activeStep].precio ) } >
                                                                                    Añadir {productosExtra[activeStep].nombre} ${productosExtra[activeStep].precio}
                                                                                </Button>
                                                                                {/* <Typography variant="h6" color="initial"  fontSize={16} style={{textAlign:'center', width:'50%'}}>{productosExtra[activeStep].nombre}</Typography>
                                                                                <Typography variant="h6" color="initial"  fontSize={16} style={{color:'red', textAlign:'center', width:'50%' }}>${productosExtra[activeStep].precio}</Typography> */}
                                                                            </Grid>
                                                                            <Grid sx={{ height: {md:300, xs:250},  width: '100%'}}>
                                                                                <img src={`${productosExtra[activeStep].imagen}`} alt="" height={'100%'} style={{ objectFit: 'cover', maxWidth:'100%'}}/>
                                                                            </Grid>
                                                                            <MobileStepper
                                                                                sx={{backgroundColor:'#f5f1ec'}}
                                                                                variant="text"
                                                                                steps={maxSteps}
                                                                                position="static"
                                                                                activeStep={activeStep}
                                                                                nextButton={
                                                                                <Button
                                                                                    size="small"
                                                                                    onClick={handleNext}
                                                                                    disabled={activeStep == maxSteps - 1}
                                                                                >
                                                                                    Next
                                                                                    {theme.direction === 'rtl' ? (
                                                                                    <KeyboardArrowLeft />
                                                                                    ) : (
                                                                                    <KeyboardArrowRight />
                                                                                    )}
                                                                                </Button>
                                                                                }
                                                                                backButton={
                                                                                <Button size="small" onClick={handleBack} disabled={activeStep == 0}>
                                                                                    {theme.direction === 'rtl' ? (
                                                                                    <KeyboardArrowRight />
                                                                                    ) : (
                                                                                    <KeyboardArrowLeft />
                                                                                    )}
                                                                                    Back
                                                                                </Button>
                                                                                }
                                                                            />
                                                                        </Grid>


                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    </>
                                                ):(

                                                    <>
                                                        <Grid  m={2}>
                                                            <Grid sx={{display:'flex', color:'#fb7185'}} onClick={()=>changeDataAddShoppingCard(3)}>
                                                                <CheckCircleIcon sx={{width:'20px', height:'auto'}}/>
                                                                <Typography variant="h6" color="#fb7185" fontSize={'16px'}> Producto Extra</Typography> {dataInfoAddShoppingCard3 ? <Typography sx={{ fontWeight:'bold' }}> - </Typography> : <Typography sx={{ fontWeight:'bold' }}> + </Typography>}
                                                            </Grid>
                                                            {dataInfoAddShoppingCard3 &&
                                                                <>
                                                                    <Typography variant="h6" component={Button} color="#B42981" fontSize={'16px'} onClick={canbiarProductoExtra}
                                                                        sx={cambiarProductoExtra ? stylesComponents.botonRecogerProductoOpcion1:stylesComponents.botonRecogerProductoOpcion2}
                                                                        m={1}
                                                                    >Cambiar producto extra</Typography>
                                                                    <Typography variant="h6" component={Button} color="#B42981" fontSize={'16px'} onClick={eliminarProducto}
                                                                        sx={eliminarProductoExtra ? stylesComponents.botonRecogerProductoOpcion1:stylesComponents.botonRecogerProductoOpcion2}
                                                                        m={1}
                                                                    >Eliminar producto extra</Typography>
                                                                </>
                                                            }
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                        </>
                                    }
                                    {/* Dedicatoria */}
                                    <Grid m={2}>
                                        <Grid sx={{display:'flex', color:'#fb7185'}} onClick={()=>changeDataAddShoppingCard(4)}>
                                            <CheckCircleIcon sx={{width:'20px', height:'auto'}}/>
                                            <Typography variant="h6" color="#fb7185" fontSize={'16px'}> Dedicatoria </Typography>{dataInfoAddShoppingCard4 ? <Typography sx={{ fontWeight:'bold' }}> - </Typography> : <Typography sx={{ fontWeight:'bold' }}> + </Typography>}
                                        </Grid>
                                        {dataInfoAddShoppingCard4 &&
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            rows={4}
                                            multiline
                                            fullWidth
                                            value={dedicatoria} // Muestra el valor actual de dedicatoria en el TextField
                                            onChange={handleChangeDedicatoria}
                                        />
                                    }
                                    </Grid>
                                    <Grid sx={{
                                            backgroundColor: '#fb718545',
                                            borderStyle: 'solid',
                                            borderColor: '#fb7185',
                                            padding: '10px'
                                        }}>
                                        <Typography variant="body1" color="initial"
                                            sx={{
                                                fontSize:'13px',
                                                color: '#fb7185'
                                            }}
                                        >Detalles de pedido</Typography>

                                        <Grid container >
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontSize:'13px',
                                                    color: '#fb7185',
                                                    fontWeight: "bold",
                                                }}
                                                >Tipo de entrega</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end',
                                                    fontWeight: "bold",
                                                    color: '#fb7185'
                                                }}
                                                >{entrega}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container >
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontSize:'13px',
                                                    color: '#fb7185',
                                                    fontWeight: "bold",
                                                }}
                                                >Fecha y hora</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end',
                                                    fontWeight: "bold",
                                                    color: '#fb7185',
                                                }}
                                                >{date.format('DD-MM-YYYY') } - {hora}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontSize:'13px',
                                                    color: '#fb7185',
                                                    fontWeight: "bold",
                                                }}
                                                >Producto Extra</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end',
                                                    fontWeight: "bold",
                                                    color: '#fb7185'

                                                }}
                                                >{productoExtra.nombreProductoExtra}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={8}>
                                                <Typography variant="body1" color="initial"
                                                sx={{
                                                    fontSize:'13px',
                                                    color: '#fb7185',
                                                    fontWeight: "bold",
                                                }}
                                                >Mensaje</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="initial"
                                                sx={{
                                                    fontSize:'12px',
                                                    textAlign:'end',
                                                    fontWeight: "bold",
                                                    color: '#fb7185'

                                                }}
                                                >{dedicatoria}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        {habilitarDesabilitarBottonCompra ? (
                                            product.descuento ? (
                                                <Button sx={{backgroundColor:'black', color:'white', width:'100%', fontSize:'11px', paddingTop:'15px', paddingBottom:'15px'}} onClick={()=>guardarDatosConDescuento(product.id,product.nombre, product.precio, product.descuento, product.imagen)} >
                                                    Añadir al carrito
                                                </Button>
                                            )
                                            :
                                            (
                                                <Button sx={{backgroundColor:'black', color:'white', width:'100%', fontSize:'11px', paddingTop:'15px', paddingBottom:'15px'}} onClick={()=>guardarDatos(product.id,product.nombre, product.precio, product.imagen)} >
                                                    Añadir al carrito
                                                </Button>
                                            )


                                        ):(
                                            <Button sx={{backgroundColor:'black', color:'white', width:'100%', fontSize:'11px' }} disabled={product.existencias != 0}>
                                                Añadir al carrito
                                            </Button>
                                        )}
                                </Grid>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
          

            <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
            >
                {/* <ShopingCarNav anchor={'right'}/> */}
                <ShopingCarNav/>
                {/* {shopCar("right")} */}
            </Drawer>

            {notiInfo &&
                <NotificacionInfo message={mensajeNotificacion} />
            }


        </>
    )
}


export default ProductId