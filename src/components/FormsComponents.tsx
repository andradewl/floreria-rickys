/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */


import React from 'react'
import {TextField, Grid,Typography, Button, FormControlLabel, Checkbox } from '@mui/material'
import { CarritoDeCompra, NuevoPedido, facturacionLogin } from '../interfaces/interfaces';
import { PayPalButtons, FUNDING   } from '@paypal/react-paypal-js'
import { CreateOrderData } from '@paypal/paypal-js';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { PaymentMethod } from '@stripe/stripe-js';
import { WidthFull } from '@mui/icons-material';
import { addPedido, dataCodigoPosta, descontarProdcutos, getDatosEntrega, getDatosFacturacionidUser } from '../config/apiFirebase';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from '../config/LocalStorage';
import { NotificacionInfo, NotificacionSuccess, Notificacionerror } from '../components/Alert';

function shopProducts() {
    const navigate = useNavigate();

    const servelUrl = "https://serve-paypal.vercel.app";
    const elements = useElements()
    const stripe = useStripe()

    const [item, setItems] = React.useState<CarritoDeCompra[]>([]);
    const [totalNumerico, setTotalNumerico] = React.useState<number>(0);
    const [totalEnvio, setTotalEnvio] =  React.useState<number>(0);
    const [totalEnvioFactura, setTotalEnvioFactura] =  React.useState<number>(0);
    const [totalEnvioDomicilio, settotalEnvioDomicilio] =  React.useState<number>(0);
    const [isEnvio, setIsEnvio] =  React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isUidUserLogin, setisUidUserLogin] = React.useState(null);

    const [notiError, setNotiError ] = React.useState(false);
    const [notiSucces, ] = React.useState(false);
    const [notiInfo, setNotiInfo] = React.useState(false);
    const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

    
    

    const [formDataFacturacion, setFormDataFacturacion] =React.useState({
        nombre: '',
        apellido: '',
        direccion: '',
        colonia: '',
        municipio: '',
        estado: '',
        cp: '',
        email: '',
        telefono: '',
    });

    const isFormValid = formDataFacturacion.nombre !=''
                        && formDataFacturacion.apellido !=''
                        && formDataFacturacion.direccion !=''
                        && formDataFacturacion.colonia !=''
                        && formDataFacturacion.municipio !=''
                        && formDataFacturacion.estado !=''
                        && formDataFacturacion.cp !=''
                        && formDataFacturacion.email !=''
                        && formDataFacturacion.telefono !='';


    const [formDataEnvio, setFormDataEnvio] =React.useState({
        nombre: '',
        apellido: '',
        direccion: '',
        colonia: '',
        municipio: '',
        estado: '',
        cp: '',
        email: '',
        telefono: '',
    });

    const isFormValidEnvio = formDataEnvio.nombre !=''
                        && formDataEnvio.apellido !=''
                        && formDataEnvio.direccion !=''
                        && formDataEnvio.colonia !=''
                        && formDataEnvio.municipio !=''
                        && formDataEnvio.estado !=''
                        && formDataEnvio.cp !=''
                        && formDataEnvio.email !=''
                        && formDataEnvio.telefono !=''

    React.useEffect(() => {
        const storedItems = localStorage.getItem('Productos');
        const storedUserName = sessionStorage.getItem('credentials');
        let dinero = 0

        if(!storedItems){
            return navigate("/");
        }

        if(storedUserName){
            const userCredential = JSON.parse(storedUserName);
            // console.log(userCredential)
            dataFcat(userCredential.uid)
            dataEntrega(userCredential.uid)
            setisUidUserLogin(userCredential.uid)
        }

        const parsedItems: CarritoDeCompra[] = JSON.parse(storedItems);
        const hasActiveStatus = parsedItems.some(item => item.entrega === 'A domicilio');

        parsedItems.forEach((item) => {
            dinero += (item.precio * item.cantidad)+( item.productoExtra.precioProductoExtra);
        })
        setLocalStorage("precioTotal", dinero)
        setIsEnvio(hasActiveStatus)
        setTotalNumerico(dinero)
        setItems(parsedItems)
    }, [])

    React.useEffect(() => {
        let sumaTotal = 0;
            item.forEach((item) => {
                sumaTotal += (item.precio * item.cantidad)+( item.productoExtra.precioProductoExtra);
            })
            setTotalNumerico(sumaTotal);
    }, [item]);


    React.useEffect(() => {
        if(isEnvio){
            if(isChecked){
                localStorage.setItem('totalEnvio', JSON.stringify(totalEnvioDomicilio));
                setTotalEnvio(totalEnvioDomicilio)
            }else{
                localStorage.setItem('totalEnvio', JSON.stringify(totalEnvioFactura));
                setTotalEnvio(totalEnvioFactura)
            }
        }else{
            localStorage.setItem('totalEnvio', JSON.stringify(0));
            setTotalEnvio(0)
        }
    }, [totalEnvioFactura, totalEnvioDomicilio ]);

    const dataFcat = async (idUsuario: string) => {
        const datosFact: facturacionLogin[] = await getDatosFacturacionidUser(idUsuario);
        // console.log(datosFact)
    
        if (datosFact.length > 0) {
            const fact = datosFact[0]; // Access the first element
            setFormDataFacturacion({
                nombre: fact.nombre,
                apellido: fact.apellidos,
                direccion: fact.direccion,
                colonia: fact.colonia,
                municipio: fact.municipio,
                estado: fact.estado,
                cp: fact.zip,
                email: fact.email,
                telefono: fact.telefono
            });
        } else {
            setFormDataFacturacion({
                nombre: '',
                apellido: '',
                direccion: '',
                colonia: '',
                municipio: '',
                estado: '',
                cp: '',
                email: '',
                telefono: ''
            });
        }
    };

    const dataEntrega = async (idUsuario: string) => {
        const datosFact: facturacionLogin[] = await getDatosEntrega(idUsuario);
        // console.log(datosFact)
    
        if (datosFact.length > 0) {
            const fact = datosFact[0]; // Access the first element
            setFormDataEnvio({
                nombre: fact.nombre,
                apellido: fact.apellidos,
                direccion: fact.direccion,
                colonia: fact.colonia,
                municipio: fact.municipio,
                estado: fact.estado,
                cp: fact.zip,
                email: fact.email,
                telefono: fact.telefono
            });
        } else {
            setFormDataEnvio({
                nombre: '',
                apellido: '',
                direccion: '',
                colonia: '',
                municipio: '',
                estado: '',
                cp: '',
                email: '',
                telefono: ''
            });
        }
    };

    const handleChangeCodioPostalFacturacion = async (e: { target: { value: string; } }) => {
        const { value } = e.target;
        if (value.length > 5) {
            setMensajeNotificacion("Ingrese un código postal válido")
            setNotiError(true)
            setTimeout(() => {
                setNotiError(false)
            }, 2000);
            // setNotiError(true)
            return
        }
        setFormDataFacturacion({
            ...formDataFacturacion,
            'cp': value
        });
        if (value.length === 5) {
            try {
                const dinero = await dataCodigoPosta(value);
                if (dinero.length > 0) {
                    dinero.forEach(element => {
                        const envioString = element.envio.toString(); // Asegúrate de que sea un string
                        const envioNumber = parseInt(envioString);
                        if (!isNaN(envioNumber)) {
                            setTotalEnvioFactura(envioNumber);
                        } else {
                            setMensajeNotificacion("El valor de envio no es un número válido:")
                            setNotiError(true)
                            setTimeout(() => {
                                setNotiError(false)
                            }, 2000);
                            // console.error("El valor de envio no es un número válido:", envioString);
                        }
                    });
                } else {

                    setMensajeNotificacion("Solo Envios a Monterrey")
                    setNotiError(true)
                    setTimeout(() => {
                        setNotiError(false)
                    }, 2000);
                    // setMensajeNotificacion("Ingrese un código postal válido")
                    // setNotiError(true)
                    // alert("Solo envíos a Monterrey");
                    setFormDataFacturacion({
                        ...formDataFacturacion,
                        'cp': ''
                    });
                }
            } catch (error) {
                console.error("Error al obtener datos de código postal:", error);
                setMensajeNotificacion("Hubo un error al verificar el código postal. Inténtelo de nuevo.")
                setNotiError(true)
                setTimeout(() => {
                    setNotiError(false)
                }, 2000);
                // alert("Hubo un error al verificar el código postal. Inténtelo de nuevo.");
            }
        }
    };


    const handleChangeCodioPostalEnvio = async(e: { target: {value:string;} }) => {
        const { value } = e.target;
        if (value.length > 5) {
            setMensajeNotificacion("Ingrese un código postal válido")
            setNotiError(true)
            setTimeout(() => {
                setNotiError(false)
            }, 2000);
            // setNotiError(true)
            return
        }
        setFormDataEnvio({
            ...formDataEnvio,
            'cp': value
        });
        if (value.length === 5) {
            try {
                const dinero = await dataCodigoPosta(value);
                if (dinero.length > 0) {
                    dinero.forEach(element => {
                        const envioString = element.envio.toString(); // Asegúrate de que sea un string
                        const envioNumber = parseInt(envioString);
                        if (!isNaN(envioNumber)) {
                            settotalEnvioDomicilio(envioNumber);
                        } else {
                            setMensajeNotificacion("El valor de envio no es un número válido:")
                            setNotiError(true)
                            setTimeout(() => {
                                setNotiError(false)
                            }, 2000);
                            // console.error("El valor de envio no es un número válido:", envioString);
                        }
                    });
                } else {

                    setMensajeNotificacion("Solo Envios a Monterrey")
                    setNotiError(true)
                    setTimeout(() => {
                        setNotiError(false)
                    }, 2000);
                    // setMensajeNotificacion("Ingrese un código postal válido")
                    // setNotiError(true)
                    // alert("Solo envíos a Monterrey");
                    setFormDataEnvio({
                        ...formDataEnvio,
                        'cp': ''
                    });
                }
            } catch (error) {
                console.error("Error al obtener datos de código postal:", error);
                setMensajeNotificacion("Hubo un error al verificar el código postal. Inténtelo de nuevo.")
                setNotiError(true)
                setTimeout(() => {
                    setNotiError(false)
                }, 2000);
                // alert("Hubo un error al verificar el código postal. Inténtelo de nuevo.");
            }
        }
    };


    const handleChangeFacturacion = (e: { target: { name: string; value: unknown; }; }) => {
        const { name, value } = e.target;
        setFormDataFacturacion({
            ...formDataFacturacion,
            [name]: value
        });
    };

    const handleChangeEnvio = (e: { target: { name: string; value: unknown; }; }) => {
        const { name, value } = e.target;
        setFormDataEnvio({
            ...formDataEnvio,
            [name]: value
        });
    }

    const handleRedirect = () =>{
        const storedUserName = sessionStorage.getItem("credentials");
        if (storedUserName) {
            const userInfo = JSON.parse(storedUserName);
            navigate("/Usuario/"+userInfo.uid);
        }else{
            navigate("/");
        }
    }

    const facturacionYEnvioTrue=(total:number)=>{
        let entrega="";
        let newItem;

        totalEnvio == 0 ? entrega="Recoge en tienda" : entrega="Entregar a cliente";

        if(isUidUserLogin != null){
            newItem={
                facturacion:formDataFacturacion,
                datosEnvio:formDataEnvio,
                carritoCompra:item,
                idEstado:"lihdGU56KMY6sblyD9xb",
                uidUserLogin:isUidUserLogin,
                entrega:entrega,
                total:total
            }
        }else{
            newItem={
                facturacion:formDataFacturacion,
                datosEnvio:formDataEnvio,
                carritoCompra:item,
                idEstado:"lihdGU56KMY6sblyD9xb",
                uidUserLogin:"no user",
                entrega:entrega,
                total:total
            }
        }
        return newItem
    }

    const facturacionYEnviofalse=(total:number)=>{
        let entrega="";
        totalEnvio == 0 ? entrega="Recoge en tienda" : entrega="Entregar a cliente";

        let newItem;
        if(isUidUserLogin != null){
            newItem={
                facturacion:formDataFacturacion,
                datosEnvio:formDataFacturacion,
                carritoCompra:item,
                idEstado:"lihdGU56KMY6sblyD9xb",
                uidUserLogin:isUidUserLogin,
                entrega:entrega,
                total:total
            }
        }else{
            newItem={
                facturacion:formDataFacturacion,
                datosEnvio:formDataFacturacion,
                carritoCompra:item,
                idEstado:"lihdGU56KMY6sblyD9xb",
                uidUserLogin:"no user",
                entrega:entrega,
                total:total
            }
        }
        return newItem
    }

    const deleteCarrito=()=>{
        localStorage.removeItem('Productos');
        localStorage.removeItem('precioTotal');
        localStorage.removeItem('envio');
    }

    const onApprove = async (data: { orderID: string }) => {
        setMensajeNotificacion("Añadiendo Pedido Espere un Momento")
        setNotiInfo(true)
        setTimeout(() => {
            setNotiInfo(false)
        }, 2000);
        // console.log(totalNumerico)
        const dinero = totalNumerico+totalEnvio
        return fetch(`${servelUrl}/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                setMensajeNotificacion("Error al capturar el pago.")
                setNotiError(true)
                setTimeout(() => {
                    setNotiError(false)
                }, 2000);
                // throw new Error();
            }
            return response.json();
        })
        .then((result) => {
            result
            // console.log("Pago exitoso", result);
            if (result.error) {
                setMensajeNotificacion("Error de pago intentelo mas Tarde...")
                setNotiError(true)
                setTimeout(() => {
                    setNotiError(false)
                }, 2000);
                result.error.message
                // console.error("error pago",result.error.message);
            } else {
                // console.log("resuñtado pago",result.paymentIntent);

                if( true== isFormValid && isFormValidEnvio == true){
                    const datosPedidos = facturacionYEnvioTrue(dinero)
                    const newItem: NuevoPedido = datosPedidos
                    addPedido(newItem)
                    .then((pedidoId) => {
                        item.forEach(async element => {
                            await descontarProdcutos(element.id, element.cantidad)
                        })
                        setTimeout(() => {
                            setNotiInfo(false)
                            alert('Pedido añadido exitosamente con id de seguimiento: '+pedidoId)
                            deleteCarrito()
                            handleRedirect()
                        }, 5000);
                    })
                    .catch((_error) => {
                        setNotiInfo(false)
                        setMensajeNotificacion("Error al crear el método de pago intentelo mas tarde")
                        setNotiError(true)
                        setTimeout(() => {
                            setNotiError(false)
                        }, 2000);
                        // alert('Error al crear el método de pago intentelo mas tarde')
                    });
                    // console.log(newItem)
                }else{
                    const datosPedidos = facturacionYEnviofalse(dinero)
                    const newItem: NuevoPedido = datosPedidos

                    addPedido(newItem)
                    .then((pedidoId) => {
                        // deleteCarrito()
                        item.forEach(async element => {
                            await descontarProdcutos(element.id, element.cantidad)
                        })
                        // setMensajeNotificacion("Añadiendo Pedido Espere un Momento")
                        // setNotiInfo(true)

                        setTimeout(() => {
                            setNotiInfo(false)
                            alert('Pedido añadido exitosamente con id de seguimiento: '+pedidoId)
                            deleteCarrito()
                            handleRedirect()
                        }, 5000);
                        // deleteCarrito()
                        // handleRedirect()
                    }).catch((_error) => {
                        setMensajeNotificacion("Error al crear el método de pago intentelo mas tarde...")
                        setNotiError(true)
                        setTimeout(() => {
                            setNotiError(false)
                        }, 2000);
                        // alert()
                    });
                    // console.log(newItem)
                }
            }
        })
        .catch((_error) => {
            setMensajeNotificacion("Error al crear el método de pago intentelo mas tarde...")
            setNotiError(true)
            setTimeout(() => {
                setNotiError(false)
            }, 2000);
            // alert('Error al crear el método de pago intentelo mas tarde')
        });
    };

    const createOrder = async (_data: CreateOrderData) => {

        const value = localStorage.getItem("precioTotal");
        const valorEnvio = localStorage.getItem("totalEnvio");

        let totalString=value

        if(value && valorEnvio){
            const number = parseInt(value)
            const number2 = parseInt(valorEnvio)
            const total = number + number2
            totalString =  total.toString()
        }else{
            totalString = value
        }
        // console.log(dinero, dinero2, dinero3, value)

        try {
            const response = await fetch(`${servelUrl}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: {
                        id: "YOUR_PRODUCT_ID",
                        descripcion: "Productos Floreria Rickys",
                        quantity: totalString,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Error al crear la orden.");
            }

            const order = await response.json();
            // console.log("Orden creada:", order);
            return order.id;
        } catch (error) {
            console.error("Error al crear la orden:", error);
            throw error; // rethrow the error after logging it
        }
    };

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensajeNotificacion("Añadiendo Pedido Espere un Momento")
        setNotiInfo(true)
        const dinero = totalNumerico+totalEnvio
        // console.log(totalNumerico)

        // console.log(isFormValid, isChecked, isFormValidEnvio)
        if(true== isChecked != isFormValidEnvio == true){

            setMensajeNotificacion("Debe llenar todos los datos de envio")
            setNotiError(true)
            setTimeout(() => {
                setNotiError(false)
            }, 2000);
            // return alert("Debe llenar todos los datos de envio")
        }

        if (!stripe || !elements) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)!,
            });
            // console.log(paymentMethod)

            if (error) {
                // const mesageError = error.message
                // setMensajeNotificacion(mesageError)
                // setNotiError(true)
                // setTimeout(() => {
                //     setNotiError(false)
                // }, 2000);
                return alert(error.message)
            }

            if (paymentMethod) {
                const { id } = paymentMethod as PaymentMethod;
                // console.log(id)

                const response = await fetch('https://stripe-server-blue.vercel.app/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: dinero, // Monto en centavos (por ejemplo, $10.00)
                        id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al procesar la solicitud');
                }

                const responseData = await response.json();
                // console.log(responseData.paymentIntent)

                if(responseData){

                    const result = await stripe.confirmCardPayment(responseData.paymentIntent, {payment_method: id});

                    if (result.error) {
                        console.error("error pago",result.error.message);
                    } else {
                        // console.log("resuñtado pago",result.paymentIntent);
                        if( true== isFormValid && isFormValidEnvio == true){

                            const datosPedidos = facturacionYEnvioTrue(dinero)
                            const newItem: NuevoPedido = datosPedidos

                            addPedido(newItem)
                            .then((pedidoId) => {
                                item.forEach(async element => {
                                    await descontarProdcutos(element.id, element.cantidad)
                                })

                                setTimeout(() => {
                                    alert('Pedido añadido exitosamente con id de seguimiento: '+pedidoId)
                                    deleteCarrito()
                                    handleRedirect()
                                }, 5000);
                                // deleteCarrito()
                                // handleRedirect()
                            })
                            .catch((_error) => {
                                setMensajeNotificacion("Error al añadir pedido intentelo mas tarde")
                                setNotiError(true)
                                setTimeout(() => {
                                    setNotiError(false)
                                }, 2000);
                                // alert('Error al añadir pedido intentelo mas tarde')
                            });
                            // console.log(newItem)

                        }else{
                            const datosPedidos = facturacionYEnviofalse(dinero)
                            const newItem: NuevoPedido = datosPedidos
                            addPedido(newItem)
                            .then((pedidoId) => {
                                item.forEach(async element => {
                                    await descontarProdcutos(element.id, element.cantidad)
                                })
                                setTimeout(() => {
                                    alert('Pedido añadido exitosamente con id de seguimiento: '+pedidoId)
                                    deleteCarrito()
                                    handleRedirect()
                                }, 5000);
                                // deleteCarrito()
                                // handleRedirect()

                            })
                            .catch((_error) => {
                                setMensajeNotificacion("Error al añadir pedido intentelo mas tarde")
                                setNotiError(true)
                                setTimeout(() => {
                                    setNotiError(false)
                                }, 2000);
                                // alert('Error al añadir pedido intentelo mas tarde')
                            });

                            // console.log(newItem)
                        }
                    }
                }else{
                    setMensajeNotificacion("Error al crear el método de pago intentelo mas tarde")
                    setNotiError(true)
                    setTimeout(() => {
                        setNotiError(false)
                    }, 2000);
                    // alert('Error al crear el método de pago intentelo mas tarde')
                }
            }
        } catch (error) {
            setMensajeNotificacion("Error al crear el método de pago intentelo mas tarde")
            setNotiError(true)
            setTimeout(() => {
                setNotiError(false)
            }, 2000);
            // alert('Error al crear el método de pago intentelo mas tarde')
        }
    };

    const isChecketEnvios=(e: boolean)=>{
        // setEntregaDeFlores(e.target.value)

        if(e == false){
            setFormDataEnvio(
                {
                    nombre: '',
                    apellido: '',
                    direccion:'',
                    colonia: '',
                    municipio: '',
                    estado: '',
                    cp: '',
                    email: '',
                    telefono: ''
                }
            )
        }
        setIsChecked(e)
    }

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '20px',
                color: '#424770',
                '::placeholder': {
                color: '#aab7c4',
                },
                WidthFull
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <>
            <Grid pt={10} sx={{paddingLeft:{xl:'10%', md:'7%',xs:'5%'}, paddingRight:{xl:'10%',md:'7%', xs:'5%', backgroundColor:'#fbf8f4'} }}>

                <Grid  >
                    <Grid container>

                        <Grid item xs={12} md={6}  sx={{padding:{xs:'0px', md:'4%', lg:'8%', xl:'10%'}, display:{xs:'block', md:'none'}}}>
                            <Grid>
                                {item && item.map((item) => (
                                    <Grid container pt={1} sx={{
                                        borderBottomWidth: '1px',
                                        borderBottomColor: '#80808040',
                                        borderBottomStyle: 'solid',

                                    }}>
                                        <Grid item xs={3} sx={{height:'80px' }}>
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
                                            <Grid container sx={{marginBottom:'20px'}}>
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

                                            </Grid>
                                        </Grid>




                                    </Grid>
                                ))}
                            </Grid>
                            <Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Subtotal</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalNumerico}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Envio</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalEnvio}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{
                                    borderBottomWidth: '1px',
                                    borderBottomColor: '#80808040',
                                    borderBottomStyle: 'solid',
                                    padding:'4px'
                                }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Descuento</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>$0</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end', fontWeight: "bold" }}>Total</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalNumerico + totalEnvio}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{padding:{xs:'0px', md:'2%', lg:'4%'}}}>
                            <Grid p={3}>
                                <Typography variant="h4" gutterBottom
                                sx={{
                                    fontFamily: "Cormorant",
                                    fontOpticalSizing: "auto",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                }}
                                >
                                    Datos de Facturacion
                                </Typography>
                                <form>
                                    <Grid container spacing={2} >
                                            <Grid item xs={12}>
                                                <TextField
                                                fullWidth
                                                label="Nombre"
                                                name="nombre"
                                                value={formDataFacturacion.nombre}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                fullWidth
                                                label="Apellido"
                                                name="apellido"
                                                value={formDataFacturacion.apellido}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                fullWidth
                                                label="Direccion"
                                                name="direccion"
                                                value={formDataFacturacion.direccion}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                label="Colonia"
                                                name="colonia"
                                                value={formDataFacturacion.colonia}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                label="Municipio"
                                                name="municipio"
                                                value={formDataFacturacion.municipio}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                label="Estado"
                                                name="estado"
                                                value={formDataFacturacion.estado}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                label="Codigo Postal"
                                                name="cp"
                                                value={formDataFacturacion.cp}
                                                onChange={handleChangeCodioPostalFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                type="email"
                                                label="Email"
                                                name="email"
                                                value={formDataFacturacion.email}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                fullWidth
                                                type="tel"
                                                label="Teléfono"
                                                name="telefono"
                                                value={formDataFacturacion.telefono}
                                                onChange={handleChangeFacturacion}
                                                required
                                                />
                                            </Grid>
                                    </Grid>
                                </form>
                            </Grid>

                            {isEnvio &&
                                <Grid p={3}>
                                    <Grid>
                                        <Grid>
                                            <Typography variant="h4" gutterBottom sx={{
                                            fontFamily: "Cormorant",
                                            fontOpticalSizing: "auto",
                                            fontWeight: "bold",
                                            fontStyle: "normal"
                                        }}>
                                                Entrega
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <FormControlLabel
                                                label="¿Mismo que la facturacion?"
                                                control={
                                                    <Checkbox
                                                    value=""
                                                    checked={!isChecked}
                                                    onChange={() => isChecketEnvios(!isChecked)}
                                                    color="primary"
                                                    />
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                    {
                                        isChecked &&
                                        <form>
                                            <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                        fullWidth
                                                        label="Nombre"
                                                        name="nombre"
                                                        value={formDataEnvio.nombre}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                        fullWidth
                                                        label="Apellido"
                                                        name="apellido"
                                                        value={formDataEnvio.apellido}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                        fullWidth
                                                        label="Direccion"
                                                        name="direccion"
                                                        value={formDataEnvio.direccion}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        label="Colonia"
                                                        name="colonia"
                                                        value={formDataEnvio.colonia}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        label="Municipio"
                                                        name="municipio"
                                                        value={formDataEnvio.municipio}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        label="Estado"
                                                        name="estado"
                                                        value={formDataEnvio.estado}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        label="Codigo Postal"
                                                        name="cp"
                                                        value={formDataEnvio.cp}
                                                        onChange={handleChangeCodioPostalEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        type="email"
                                                        label="Email"
                                                        name="email"
                                                        value={formDataEnvio.email}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                        fullWidth
                                                        type="phone"
                                                        label="Teléfono"
                                                        name="telefono"
                                                        value={formDataEnvio.telefono}
                                                        onChange={handleChangeEnvio}
                                                        required
                                                        />
                                                    </Grid>
                                            </Grid>
                                        </form>
                                    }
                                </Grid>
                            }

                            <Grid>
                                <Grid m={1} ml={3} mr={3} pb={1} sx={{ borderBottom:'1px solid #afafaf', textAlign:'center' }}>

                                    <Typography variant="h5" color="initial" m={1} sx={{
                                        fontFamily: "Cormorant",
                                        fontOpticalSizing: "auto",
                                        fontWeight: "bold",
                                        fontStyle: "normal"
                                    }}>Pago con tarjeta</Typography>


                                    <CardElement options={cardElementOptions}/>
                                    <Grid m={1}>
                                        <Button
                                            disabled={!isFormValid}
                                            onClick={handleSubmit2}
                                        >
                                            Pagar
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid m={1} ml={3} mr={3} pb={1} sx={{ textAlign:'center' }}>
                                    <Typography variant="h5" color="initial" m={1} sx={{
                                        fontFamily: "Cormorant",
                                        fontOpticalSizing: "auto",
                                        fontWeight: "bold",
                                        fontStyle: "normal"
                                    }}>o pago con paypal</Typography>
                                    <PayPalButtons
                                        createOrder={(data) => createOrder(data)}
                                        onApprove={(data) => onApprove(data)}
                                        fundingSource={FUNDING.PAYPAL}
                                        disabled={!isFormValid}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={6}  sx={{padding:{xs:'0px', md:'4%', lg:'8%', xl:'10%'}, display:{xs:'none', md:'block'}}}>
                            <Grid>
                                {item && item.map((item) => (
                                    <Grid container pt={1} sx={{
                                        borderBottomWidth: '1px',
                                        borderBottomColor: '#80808040',
                                        borderBottomStyle: 'solid',

                                    }}>
                                        <Grid item xs={3} sx={{height:'100px' }}>
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
                                            <Grid container sx={{marginBottom:'20px'}}>
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

                                            </Grid>
                                        </Grid>




                                    </Grid>
                                ))}
                            </Grid>
                            <Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Subtotal</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalNumerico}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Envio</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalEnvio}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{
                                    borderBottomWidth: '1px',
                                    borderBottomColor: '#80808040',
                                    borderBottomStyle: 'solid',
                                    padding:'4px'
                                }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>Descuento</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>$0</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{padding:'4px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end', fontWeight: "bold" }}>Total</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="initial" sx={{ textAlign:'end' }}>${totalNumerico + totalEnvio}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
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
    );

}

export default shopProducts


