
export const stylesComponents = {

    //------------------------------Barra de navegacion------------------------------//
    appBar:{
        position:"sticky",
        width:'100%',
        background:"#none",
        height:'0px'
    },
    appBarScrolled:{
        color:'black',
        width:'100%',
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(11.7px)",
        webkitBackdropFilter: "blur(11.7px)",
        
    },
    appSubBar:{
        position:"sticky",
        display:'flex', padding:'5px', paddingLeft:'5%', paddingRight:'5%', backgroundImage:'linear-gradient(to right, #ff646461 0%, #bb6e6e52 51%, #d62d9263 100%)'
    },
    toolbar:{
        display:'flex',
        justifyContent: 'space-around',
    },
    boxMenuResponsive:{
        display: {
            xs: 'flex',
            md: 'none'
        }
    },
    MenuResponsive:{
        display: {
            xs: 'block',
            md: 'none'
        }

    },
    boxMenuDesk:{
        display: {
            xs: 'none',
            md: 'flex'
        }
    },
    navigationButton:{
        m: 2,
        color: '#B42981',
        display: 'block',
        fontSize:'15px'
    },
    logoResponsive:{
        width: 150,
        display: {
            xs: 'flex',
            md: 'none'
        },
        justifyContent:{
            md:'center'
        }
    },
    iconsMovile:{
        padding:'3px',
        fontSize: 30,
        color:'purple'
    },
    butonMenu:{
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'white'
    },
    butonMenu2:{
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'black'
    },
    butonMenuScroll:{
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'black'
    },

    butonMenuCarrito:{
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'white',
        width:'150px',
    },

    butonMenuCarrito2:{
        width:'150px',
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'black'
        
    },
    butonMenuCarritoScroll:{
        fontSize:'11px',
        borderRadius:'30px',
        margin:'10px',
        color:'black',
        width:'150px'
    },
    menuResponsivo:{
        display:{xs:'flex', md:'none'},
        justifyContent:'end',
        alignItems:'center',
        color:"white"
    },
    menuResponsivo2:{
        display:{xs:'flex', md:'none'},
        justifyContent:'end',
        alignItems:'center',
        color:"black"
    },

    //------------------------------Footer------------------------------//

    BoxFooter:{
        backgroundColor: '#f5f1ec',
        
        paddingTop:'35px'
    },

    //------------------------------titulos banner------------------------------//
    titlesBanners:{
        color:'#ffff',
        fontFamily:'Archivo Black, sans-serif',
        fontSize:{
            md:'74px',
            sm:'50px',
            xs:'40px'
        }
    },

    titles3Banners:{
        color:'#ffff',
        fontFamily:'Archivo Black, sans-serif',
        fontSize:{
            md:'29px',
            sm:'25px',
            xs:'20px'
        }
    },

    //------------------------------boton para banners------------------------------//

    buttonBanners:{
        border:'2px solid #b42981',
        backgroundImage:'linear-gradient(to right, #FF6464 0%, #FF6464  51%, #FF81CE  100%)',
        margin: {xm:'2px', md:'10px'},
        textTransform: 'uppercase',
        transition: '0.5s',
        color: 'white',
        borderStyle:'none',
        borderRadius:'50px',
        fontFamily:'Archivo Black, sans-serif',
        padding:{xm:'2px', md:'10px'}
    },
    //------------------------------Boton Global------------------------------//
    button:{
        border:'2px solid #b42981',
        backgroundImage:'linear-gradient(to right, #FF6464 0%, #FF6464  51%, #FF81CE  100%)',
        textTransform: 'uppercase',
        transition: '0.5s',
        color: 'white',
        borderStyle:'none',
        // borderRadius:'50px',
        fontFamily:'Archivo Black, sans-serif',
        padding:'10px',
        width:'100%'
    },
    //------------------------------Contenedor ocasiones------------------------------//

    // megaContenedorOcasiones:{
    //     paddingLeft:{
    //         xs:'10px',
    //         md:'50px'
    //     },
    //     paddingRight:{
    //         xs:'10px',
    //         md:'50px'

    //     }
    // },

    contenedorOcasiones:{
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center'
    },

    cajaDatosOcasioners:{
        justifyContent:'center',
        maxWidth:'100%',
        display:'flex',
        position: 'relative',
    },

    contenedorImagen:{
        width:'100%',
        height:{
            lg:'300px',
            md:'200px',
            sm:'300px',
            xs:'170px'
        },
        borderRadius:'100px'
    },

    animacionTextoSobreImagenOcasiones:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(255, 100, 100, 0.7) 0%, rgba(255, 100, 100, 0.7) 51%, rgba(255, 129, 206, 0.7) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transition: 'opacity 0.3s ease','&:hover': {
            opacity: 1,
        },
    },

    letraSobreImagen:{
        color:'white',
        fontFamily:'Archivo Black, sans-serif',
        fontSize:{
            md:'40px',
            xs:'20px'
        }
    },


    //------------------------------Productos------------------------------//

    ContenedorProductos:{
        textAlign:'center',
        display:'flex',
        justifyContent:'center',
    },

    contenedorProducto:{
        paddingLeft:1,
        paddingRight:1,
        paddingButtom:5,
        paddingTop:5,

    },
    contenerdorImagenProducto:{
        width:'100%',
        height:{
            xs:'200px',
            sm:'380px',
            md:'260px',
            lg:'350px',
            xl:'323px'
        },
        // width:'100px',
        // height:'100px',
        display:'flex',
        position: 'relative',
    },

    botonRecogerProductoOpcion1:{
        display:'block',
        width:'100%',
        color:'white',
        backgroundColor:'#fb7185',
        paddingTop:'15px',
        paddingBottom:'15px',
        borderRadius:'13px'
    },

    botonRecogerProductoOpcion2:{
        display:'block',
        width:'100%' ,
        backgroundColor:'white',
        paddingTop:'15px',
        paddingBottom:'15px',
        borderRadius:'13px'
    },

    botontipografia1RecogerProductoOpcion1:{
        color:'white',
        fontWeight:'bold'
    },

    botontipografia1RecogerProductoOpcion2:{
        fontWeight:'bold'
    },

    botontipografia2RecogerProductoOpcion1:{
        color:'white'
    },

    botontipografia2RecogerProductoOpcion2:{
        color:'#737373'
    },

    //------------------------------Filtros------------------------------//

    espaciadoOrdenFiltroTitulo:{
        padding:'10px',
        color:'#fffff',
        display:{
            md:'block',
            xs:'none'
        }
    },

    espaciadoOrdenFiltro:{
        padding:{
            xs:'5px',
            md:'10px'
        },
        paddingTop:{xs:'20px'},

        color:'#fffff',
    },


    botonFiltro:{
        border:'2px solid #b42981',
        backgroundImage:'linear-gradient(to right, #FF6464 0%, #FF6464  51%, #FF81CE  100%)',
        textTransform: 'uppercase',
        transition: '0.5s',
        color: 'white',
        borderStyle:'none',
        borderRadius:'50px',
        fontFamily:'Archivo Black, sans-serif',
        fontSize:{
            md:'12px',
            xs:'9px'
        },
        padding:'6px',
        width:{
            xs:'100%',
            md:'250px'
        },
    },


    positionOfFilter:{
        display:'flex',
        height:'40px',
        justifyContent:{
            lg:'end',
            sm:'center'
        },


        fontFamily:'Archivo Black, sans-serif'

    }


};