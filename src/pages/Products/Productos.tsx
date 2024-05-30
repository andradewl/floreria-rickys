/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import { Box, Grid, Typography, MenuItem, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { stylesComponents } from '../../styles/stylesComponentes'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { Flower, Ocasionest, Tipoflores } from '../../interfaces/interfaces'
import { getOcasiones, getProducts, getTipoFlores } from '../../config/apiFirebase'
// import { onValue } from 'firebase/database';

function Productos(){

    const navigate = useNavigate()
    const [flores, setFlores] = React.useState<Flower[]>([]);
    const [floresFiltro, setFloresFiltro] = React.useState<Flower[]>([]);
    const [ocasiones, setOcasiones] = React.useState<Ocasionest[]>([]);
    const [tipoFlores, setTipoFlores] = React.useState<Tipoflores[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const flowersData = await getProducts();
                setFloresFiltro(flowersData);
                setFlores(flowersData);
                fetchTipoFlores();
                fetchOcasiones();
            } catch (error) {
                console.error('Error fetching flowers:', error);
            }
        };
        fetchData();
    }, []);

    const fetchTipoFlores = async () => {
        try {
            const typeFlowersData = await getTipoFlores();
            console.log(typeFlowersData)
            setTipoFlores(typeFlowersData);
        } catch (error) {
            console.error('Error fetching typeFlower:', error);
        }
    };

    const fetchOcasiones = async () => {
        try {
            const OcasionesData = await getOcasiones();
            console.log(OcasionesData)
            setOcasiones(OcasionesData);
        } catch (error) {
            console.error('Error fetching ocasiones:', error);
        }
    };

    const handleChangePrecio = (event: SelectChangeEvent) => {
        if (event.target.value == "mayor"){
            const filtroFlores = floresFiltro.slice().sort((a, b) => b.precio - a.precio)
            setFloresFiltro(filtroFlores)
        }else if(event.target.value == "menor"){
            const filtroFlores = floresFiltro.slice().sort((a, b) => a.precio - b.precio)
            setFloresFiltro(filtroFlores)
        }else{
            const filtroFlores = flores
            setFloresFiltro(filtroFlores)
        }
        console.log(event.target.value)
    };

    const handleRedirectToProductId = (id:string) => {
        navigate('/Producto/'+id);
    };

    const filtroPorTipoDeFlores = (id:string)=>{
        const filtroFlores = flores.filter((product) => product.tipoflor === id)
        setFloresFiltro(filtroFlores)
    }

    const filtroPorOcasiones = (id:string)=>{
        const filtroFlores = flores.filter((product) => product.ocasion === id)
        setFloresFiltro(filtroFlores)
    }


    return(
        <>
        <Grid sx={{width:'100%', height:'560px', backgroundColor:'#fdcfd5', position: 'relative'}}>
            <Grid width={'100%'} height={'100%'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h2" color="white">Productos</Typography>
            </Grid>
        </Grid>
            <Grid container sx={{paddingLeft:'5%', paddingRight:'5%'}} >
                <Grid item xs={12} sx={stylesComponents.positionOfFilter}>
                    <Box sx={stylesComponents.espaciadoOrdenFiltro}>
                        <Select
                                value=''
                                onChange={handleChangePrecio}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                // onChangeCapture={()=>console.log(onValue)}
                            >
                            <MenuItem value="">
                                <em>Ver todo</em>
                            </MenuItem>
                            <MenuItem value={'mayor'} sx={{ fontize:'20px'}}>Mayor precio</MenuItem>
                            <MenuItem value={'menor'}>Menor precio</MenuItem>
                        </Select>
                    </Box>
                    {/* { filtroTipoFlor &&
                        <Box sx={stylesComponents.espaciadoOrdenFiltro}>
                            <Button variant="text">
                                Quitar filtro
                            </Button>

                        </Box>
                    } */}
                </Grid>
                <Grid item xs={12} paddingTop={'30px'} >
                    <Grid container>

                        <Grid item md={2} sx={{display:{ xs:'none', md:'block'}}}>
                            <Grid >
                                <Typography variant="h1" color="initial" sx={{fontSize:'30px', fontFamily:'Archivo Black, sans-serif', color:'#B42981'}}>Ocasiones</Typography>
                                <Grid>

                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                        >
                                            {ocasiones && ocasiones.map((item) => (
                                                <ListItem disablePadding>
                                                    <ListItemButton onClick={() => filtroPorOcasiones(item.id)}>
                                                    <ListItemText primary={item.nombre} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Grid>
                            </Grid>

                            <Grid >
                                <Typography variant="h1" color="initial" sx={{fontSize:'30px', fontFamily:'Archivo Black, sans-serif', color:'#B42981'}}>Flores</Typography>
                                <Grid>

                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                        >

                                            {tipoFlores && tipoFlores.map((item) => (
                                                <ListItem disablePadding>
                                                    {/* <ListItemButton> */}
                                                    <ListItemButton onClick={() => filtroPorTipoDeFlores(item.id)}>
                                                        <ListItemText primary={item.nombre} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                    </List>

                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item md={10} xs={12}>
                            <Grid container sx={stylesComponents.ContenedorProductos}>
                            {floresFiltro && floresFiltro.map((item) => (
                                <Grid item xs={12} md={6} lg={3} sx={stylesComponents.contenedorProducto}>
                                    <Box display={'flex'} style={{justifyContent:'center'}}>
                                        <Grid sx={stylesComponents.contenerdorImagenProducto} onClick={()=>handleRedirectToProductId(item.id)}>
                                            <img src={item.imagen} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover', position:'relative'}} />
                                            <Grid width={'100%'} height={'100%'} sx={{position: 'absolute', textAling:'left' }}>
                                                <Box sx={{ backgroundColor:'#ef8f61', width:'50%', color:'white', borderRadius:'5px', fontSize:'20px', margin:'5px' }}>
                                                    !Oferta¡
                                                </Box>
                                            </Grid>
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
                                                        justifyContent: 'center',
                                                        textAlign: 'center',
                                                        padding: '2px'
                                                    }}
                                                >
                                                    <Grid sx={{width:{xs:'300px', md:'400px', lg:'200px'}}}>
                                                        <Box sx={{ padding: {xs:'10px', lg:'2px'} }}>
                                                            {/* <Box sx={{justifyContent:'center', textAlign:'center', padding:'2px'}} >
                                                                <FavoriteBorderIcon sx={{width:'50%', justifyContent:'center', textAlign:'center'}}/>
                                                                <RemoveRedEyeIcon sx={{width:'50%', justifyContent:'center', textAlign:'center'}}/>
                                                            </Box> */}
                                                            <Box sx={{ justifyContent:'center', textAlign:'center', padding:'2px'}} onClick={()=>handleRedirectToProductId(item.id)}>
                                                                <Typography variant="h6" color="initial"  fontSize={16} textAlign={'center'} style={{color:'#404040', textAlign:'center'}}>{item.nombre}</Typography>
                                                            </Box>
                                                            <Box sx={{display:'flex',justifyContent:'center', textAlign:'center', padding:'2px'}}>
                                                                <Typography variant="h6" color="initial"  fontSize={16} textAlign={'center'} style={{color:'#404040', textAlign:'center', width:'50%',  textDecorationLine: 'line-through', fontWeight: 'bold' }}>${item.precio}</Typography>
                                                                <Typography variant="h6" color="initial"  fontSize={16} textAlign={'center'} style={{color:'#9c0ba8', textAlign:'center', width:'50%', fontWeight: 'bold' }}>${item.descuento}</Typography>
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
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    padding: '2px'
                                                }}
                                            >
                                                <Grid
                                                    sx={{width:{xs:'300px', md:'400px', lg:'200px'}}}
                                                >
                                                    <Box sx={{ padding: {xs:'10px', lg:'2px'} }}>
                                                        {/* <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                                            <FavoriteBorderIcon sx={{ width: '50%' }} />
                                                            <RemoveRedEyeIcon sx={{ width: '50%' }} />
                                                        </Box> */}
                                                        <Box
                                                            sx={{
                                                                justifyContent: 'center',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                color="initial"
                                                                fontSize={16}
                                                                textAlign="center"
                                                                style={{ color: '#404040' }}
                                                            >
                                                            {item.nombre}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ justifyContent: 'center', textAlign: 'center', padding: '2px' }}>
                                                            <Typography
                                                                variant="h6"
                                                                color="initial"
                                                                fontSize={16}
                                                                textAlign="center"
                                                                style={{ color: '#9c0ba8' }}
                                                            >
                                                            ${item.precio}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                        )

                                    }

                                </Grid>
                            ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}


export default Productos