import {  Box, Button, Grid, Pagination, PaginationItem, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { stylesComponents } from "../styles/stylesComponentes"
import '../styles/fuentes.css'
import { getOcasiones, getProducts } from "../config/apiFirebase";
import React from "react";
import { Flower, Ocasionest } from "../interfaces/interfaces"
// import { useNavigate } from 'react-router-dom';
import BarraDeBusqueda from "../components/BarraDeBusqueda";
// import videoBanner from '../assets/banners/videobanner2.gif'
// import { NotificacionSuccess } from "../components/Alert";
function Home(){

    // const navigate = useNavigate()
    const [flores, setFlores] = React.useState<Flower[]>([]);
    const [ocasinesDataId, setOcasinesDataId] = React.useState<Ocasionest[]>([]);

    React.useEffect(()=>{
        fetchFlores()
    },[])



    const redireccionConRefresh = (nombre:string, id:string)=>{
        const redireccion = "ocasion/"+nombre+"/"+id
        window.location.href = redireccion
    }


    const fetchFlores = async () => {
        try {
            const flowersData = await getProducts();
            const ocasionesDataid = await getOcasiones()
            setOcasinesDataId(ocasionesDataid)
            setFlores(flowersData);
        } catch (error) {
            console.error('Error fetching flowers:', error);
        }
    };

    const handleRedirectToProductId = (id:string) => {
        const redireccion = "Producto/"+id
        window.location.href = redireccion
        // navigate('/Producto/'+);
    };

    return(
        <>
            <Grid sx={{width:'100%', height:{xs:'300px', sm:'600px',md:'500px', lg:'600px', xl:'750px'}, position: 'relative'}}>
                <Grid sx={{width:'100%', height: '100%', position:'relative', zIndex:1}}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/prowlflores.appspot.com/o/multimedia%2Fimagenes%2FFondos%2Fvideobanner2.gif?alt=media&token=8ed486c2-5f84-43e7-93c7-0ae9d4103c0d" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'left'}} alt="" />
                </Grid>
                <Grid sx={{position: 'absolute',top: 0, left: 0, bottom:0 ,width: '100%', height: '100%', backgroundColor: '#0000004d', zIndex: 2}}>
                    <Grid sx={{ paddingLeft:"2%", paddingTop:{xs: "20%", sm:"12%",md:"13%"} }}>
                        <Typography variant="h1" color="initial" sx={{
                            color:'white',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:{xs: "40px",md:"60px"}
                        }}>Sorprende a mamá</Typography>
                        <Typography variant="body1" color="initial" sx={{
                            color:'white',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                            fontSize:{xs: "15px",md:'20px'}
                        }}>Porque mama tambien merece ser consentida</Typography>
                        <Button
                        sx={{
                            background:'white',
                            color:'black',
                            fontSize:{xs: '12px',md:'17px'},
                            padding:'17px',
                            paddingLeft:'40px',
                            paddingRight:'40px',
                            marginTop:{xs:'50px',sm:'30px',md:'60px',lg:'100px'}
                        }}
                        >
                            Productos Disponibles para mama
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid>
                <Banners/>
            </Grid> */}

            <Grid>
                <BarraDeBusqueda/>
            </Grid>

            <Grid  sx={{paddingLeft:{xl:'10%', md:'3%',xs:'5%'}, paddingRight:{xl:'10%',md:'3%', xs:'5%', backgroundColor:'#fbf8f4'}}} pb={8}>
                <Grid style={{textAlign:'start', padding:'8px', paddingTop:'80px', paddingBottom:'80px' }} data-aos="fade-right">
                    <Typography variant="h1" color="initial"
                        sx={{
                            color:'#fb7185',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:{md:'45px', xs:'25px'}
                            }}>
                        ¡Pequeños detalles marcando diferencia!
                    </Typography>
                    <Typography variant="subtitle1" color="initial" fontSize='17px'
                        sx={{color:'black',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                            fontSize:{md:'25px'}}} >
                        En Flores El Gato encontrarás lo que necesitas para cada ocasión.
                    </Typography>
                </Grid>

                <Grid >
                    <Grid container display={'flex'}>

                        {ocasinesDataId && ocasinesDataId.map((item) => (
                            <Grid item xs={6} md={4} sx={stylesComponents.contenedorOcasiones} p={'8px'}>
                                <Box sx={stylesComponents.cajaDatosOcasioners}>
                                    <Grid sx={stylesComponents.contenedorImagen}>
                                        <img src={item.imagen} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover'}}/>
                                    </Grid>
                                    <Paper sx={stylesComponents.animacionTextoSobreImagenOcasiones} onClick={()=>redireccionConRefresh(item.nombre, item.id)}>
                                        <Typography variant="h4" color="initial" sx={stylesComponents.letraSobreImagen}>{item.nombre}</Typography>
                                    </Paper>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid>

            <Grid sx={{paddingLeft:{xl:'15%', md:'1%',xs:'5%'}, paddingRight:{xl:'15%',md:'1%', xs:'5%'}, paddingTop:'80px', paddingBottom:'80px' }} >
                <Grid style={{textAlign:'center', padding:'8px'}} >
                    <Typography variant="h1" color="initial" fontSize='34px'  sx={{
                            color:'#fb7185',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            fontSize:{md:'45px', xs:'25px'}
                            }} pb={4}>
                        Mas Vendidos
                    </Typography>
                    <Typography variant="subtitle1" color="initial" fontSize='17px'
                        sx={{color:'black',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                            fontSize:{md:'20px'}}} pb={8}>
                        Ver Todo →
                    </Typography>
                </Grid>

                <Grid>
                    <Grid container sx={stylesComponents.ContenedorProductos} >
                        {flores && flores.map((item) => (
                            <Grid item xs={6} md={3}  sx={stylesComponents.contenedorProducto}>
                                <Box display={'flex'} style={{justifyContent:'center'}}>
                                    <Grid sx={stylesComponents.contenerdorImagenProducto} onClick={()=>handleRedirectToProductId(item.id)}>
                                        <img src={item.imagen} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover', position:'relative', borderRadius:'7px'}} />
                                        {item.descuento &&
                                            <Grid width={'100%'} height={'100%'} sx={{position: 'absolute', textAling:'left' }}>
                                                <Box sx={{ backgroundColor:'#ef8f61', width:'50%', color:'white', borderRadius:'5px', fontSize:'20px', margin:'5px' }}>
                                                    !Oferta¡
                                                </Box>
                                            </Grid>
                                        }
                                    </Grid>
                                </Box>
                                {
                                    item.descuento ?
                                    (
                                        <>
                                            <Grid
                                                container
                                                sx={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Grid
                                                sx={{
                                                    width: '100%',
                                                }}
                                                >
                                                    <Box sx={{ paddingTop:'2px' }}>
                                                        <Box sx={{padding:'2px'}} onClick={()=>handleRedirectToProductId(item.id)}>
                                                            <Typography variant="body1" color="initial" style={{color:'#404040',
                                                                fontFamily: "Cormorant",
                                                                fontOpticalSizing: "auto",
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                textAlign:'left',
                                                                fontSize:'17px',
                                                                whiteSpace:'nowrap', overflow:'hidden'
                                                            }}>{item.nombre}</Typography>
                                                            <Typography variant="body1" color="initial"  style={{color:'#404040',
                                                                fontFamily: "Cormorant",
                                                                fontOpticalSizing: "auto",
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                textAlign:'left',
                                                                fontSize:'12px'
                                                            }}>
                                                                {ocasinesDataId && ocasinesDataId.map((item2) => (
                                                                    item2.id === item.ocasion ? item2.nombre : null
                                                                ))}
                                                                </Typography>
                                                        </Box>
                                                        <Box sx={{display:'flex',padding:'2px',width: '100%',}}>
                                                            <Typography variant="body2" color="initial"  style={{color:'#404040',textAlign:'left', width:'50%',  textDecorationLine: 'line-through', fontWeight: 'bold', fontSize:'12px' }}>${item.precio}</Typography>
                                                            <Typography variant="body2" color="initial"  style={{color:'#9c0ba8', textAlign:'right',width:'50%', fontWeight: 'bold',fontSize:'12px' }}>${item.descuento}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </>
                                    )
                                    :
                                    (
                                        <Grid
                                            container
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Box sx={{ padding: {xs:'10px', lg:'2px'} }}>
                                                    <Box sx={{ padding: '2px' }}>
                                                        <Typography variant="body1" color="initial" style={{color:'#404040',
                                                            fontFamily: "Cormorant",
                                                            fontOpticalSizing: "auto",
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            textAlign:'left',
                                                            fontSize:'17px',
                                                            whiteSpace:'nowrap', overflow:'hidden'
                                                        }}>{item.nombre}</Typography>
                                                        <Typography variant="body1" color="initial"  style={{color:'#404040',
                                                            fontFamily: "Cormorant",
                                                            fontOpticalSizing: "auto",
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            textAlign:'left',
                                                            fontSize:'12px'
                                                        }}>
                                                            {ocasinesDataId && ocasinesDataId.map((item2) => (
                                                                item2.id === item.ocasion ? item2.nombre : null
                                                            ))}
                                                        </Typography>
                                                        {/* <Typography
                                                            variant="h6"
                                                            color="initial"
                                                            fontSize={16}
                                                            textAlign="center"
                                                            style={{ color: '#9c0ba8' }}
                                                        >
                                                        ${item.precio}
                                                        </Typography> */}
                                                    </Box>
                                                    <Box
                                                    >
                                                        {/* <Typography
                                                            variant="h6"
                                                            color="initial"
                                                            fontSize={16}
                                                            style={{ color: '#404040' }}
                                                        >
                                                        {item.nombre} */}
                                                        {/* </Typography> */}
                                                        <Typography variant="body2" color="initial"  style={{color:'#9c0ba8', textAlign:'left', fontWeight: 'bold',fontSize:'12px' }}>${item.precio }</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    )

                                }

                            </Grid>
                        ))}

                        <Pagination
                            count={10}
                            renderItem={(flores) => (
                                <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...flores}
                                />
                            )}
                        />



                    </Grid>
                </Grid>

            </Grid>
            {/* <NotificacionSuccess message='este es nu mensaje nuevo'/> */}
        </>
    )
}


export default Home

