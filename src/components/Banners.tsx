import {  Box, Button, Grid, Typography } from "@mui/material";
import { stylesComponents } from "../styles/stylesComponentes";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';



import banner1 from '../assets/banners/1.png'
import banner2 from '../assets/banners/2.png'
import banner3 from '../assets/banners/3.png'
import React from "react";
import { UserLogin } from '../interfaces/interfaces';


const steps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
        banner1
    },
    {
        label: 'Bird',
        imgPath:banner2
    },
    {
        label: 'Bali, Indonesia',
        imgPath:banner3
    }
];


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function Banners(){


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = React.useState<UserLogin>();



    React.useEffect(()=>{
        const storedUserCredentials = sessionStorage.getItem('credentials');
        const storedUserName = sessionStorage.getItem('userlogIn');

        if (storedUserCredentials && storedUserName) {
            const userCredential = JSON.parse(storedUserCredentials);
            const userInfo = JSON.parse(storedUserName);
            userCredential
            // console.log(userCredential.email, userInfo.email);
            setUserLogin(userInfo)

        }
    },[])

    const handleChangeIndex = (index: React.SetStateAction<number>) => {
        setActiveIndex(index);
    };

    const handleNuevoClick = () => {
        navigate('/Login');
    };
    const handleNuevoClickUsuario = (id:string) => {
        navigate('/Usuario/'+id);
    };



    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const autoPlayConfig = {
        interval: 3000, // 3 seconds
        index: activeIndex,
        onChangeIndex: handleChangeIndex,
    };


    return(
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>

            <AutoPlaySwipeableViews
                {...autoPlayConfig}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {steps.map((steps, index) => (
                    <Grid key={steps.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <>
                                <Grid sx={ {position: 'relative'} }>
                                    <Box
                                        component="img"
                                        sx={{
                                        height: {
                                            md:600,
                                            xs:270
                                        },
                                        display: 'block',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        width: '100%',
                                        }}
                                        src={steps.imgPath}
                                        alt={steps.label}
                                    />
                                    <Typography variant="h2" sx={{position: 'absolute',
                                        top: '45%', // Ajusta la posición vertical del texto
                                        left: '15%', // Ajusta la posición horizontal del texto
                                        transform: 'translate(0%, -50%)', // Centra el texto
                                        textAlign: 'center', // Alinea el texto al centro
                                        color: 'black', // Color del texto
                                        padding: '10px', // Espaciado interno del texto (opcional)
                                        fontSize:{
                                            xs:'10px', md:'18px'
                                        },
                                        width:'150px',
                                        borderLeft: 4,
                                        borderLeftColor:'#ff26d0'
                                    }}
                                    fontFamily={'Archivo Black, sans-serif'}
                                    >
                                        APROVECHA LAS OFERTAS
                                    </Typography>
                                    <Typography variant="h2" sx={{position: 'absolute',
                                        top: {
                                            xs:'64%', md:'57%'
                                        }, // Ajusta la posición vertical del texto
                                        left: '15%', // Ajusta la posición horizontal del texto
                                        transform: 'translate(0%, -50%)', // Centra el texto
                                        textAlign: 'center', // Alinea el texto al centro
                                        color: 'black', // Color del texto
                                        padding: '10px', // Espaciado interno del texto (opcional)
                                        borderRadius: '5px',
                                        fontSize:{
                                            xs:'20px', md:'50px'
                                        },
                                        }}
                                        fontFamily={'Archivo Black, sans-serif'}
                                        >
                                            Flores
                                    </Typography>
                                    <Typography variant="h2" sx={{position: 'absolute',
                                        top: {
                                            xs:'74%', md:'65%'
                                        },
                                        left: '15%',
                                        transform: 'translate(0%, -50%)', // Centra el texto
                                        textAlign: 'center', // Alinea el texto al centro
                                        color: 'black', // Color del texto
                                        padding: '10px', // Espaciado interno del texto (opcional)
                                        borderRadius: '5px',
                                        fontSize:{
                                            xs:'15px', md:'20px'
                                        },
                                        }}
                                        fontFamily={'Archivo Black, sans-serif'}
                                        >
                                            Para toda ocasion
                                    </Typography>
                                    <Grid pt={10} textAlign="start" sx={{position: 'absolute',
                                        top: '75%',
                                        left: '15%', // Ajusta la posición horizontal del texto
                                        transform: 'translate(0%, -50%)'}}>
                                            {userLogin ? (
                                                <Button onClick={()=>handleNuevoClickUsuario(userLogin.id)} sx={stylesComponents.buttonBanners}>
                                                    Registrate Ahora
                                                </Button>
                                            ):(
                                                <Button onClick={handleNuevoClick} sx={stylesComponents.buttonBanners}>
                                                    Registrate Ahora
                                                </Button>
                                            )}
                                    </Grid>
                                </Grid>

                            </>
                        ) : null}
                    </Grid>
                ))}
            </AutoPlaySwipeableViews>
        </Box>
    )
}

export default Banners