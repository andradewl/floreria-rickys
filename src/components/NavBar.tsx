/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../assets/logo.png'
import '../styles/estilosCss.css'
import { Box, Collapse, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { stylesComponents } from '../styles/stylesComponentes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation  } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Ocasionest } from '../interfaces/interfaces';
import { getOcasiones } from '../config/apiFirebase';
import HomeIcon from '@mui/icons-material/Home';
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShopingCarNav from './ShopingCarNav';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserLogin } from '../interfaces/interfaces';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function ResponsiveAppBar() {

  const location = useLocation();

  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [ocasiones, setOcasiones] = React.useState<Ocasionest[]>([]);
  const [openOcasiones, setOpenOcasiones] = React.useState(true);
  const [currentView, setCurrentView] = React.useState('/');
  const [precioAPagar, setPrecioAPagarw] = React.useState('0');
  const [datauser, setdatauser] = React.useState<UserLogin>();


  React.useEffect(()=>{
    const rutaActual = location.pathname
    const storedUserCredentials = sessionStorage.getItem('credentials');
    const storedUserName = sessionStorage.getItem('userlogIn');

    const value = localStorage.getItem("precioTotal");
    value ? setPrecioAPagarw(value) :setPrecioAPagarw("0")
    if (storedUserCredentials && storedUserName) {
      const userCredential = JSON.parse(storedUserCredentials);
      const userInfo = JSON.parse(storedUserName);

      // userCredential
      // userInfo
      // console.log(userCredential, userInfo);
      if(userCredential.email == userInfo.email){
        setdatauser(userInfo)
      }
    }

    setCurrentView(rutaActual)
  },[])

  const changeView = (viewName: React.SetStateAction<string>) => {
    setCurrentView(viewName);
  }
  React.useEffect(() => {
    const fetchData = async () => {
        try {
            fetchOcasiones();
        } catch (error) {
            console.error('Error fetching flowers:', error);
        }
    };
    fetchData();
  }, []);

  const fetchOcasiones = async () => {
    try {
        const OcasionesData = await getOcasiones();
        // console.log(OcasionesData)
        setOcasiones(OcasionesData);
    } catch (error) {
        console.error('Error fetching ocasiones:', error);
    }
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleClickOcasiones = () => {
    setOpenOcasiones(!openOcasiones);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('credentials');
    sessionStorage.removeItem('userlogIn');
    window.location.href = "/"

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


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={"Inicio"}  onClick={()=>{changeView("/"),navigate('/')}} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Inicio"} />
          </ListItemButton>
        </ListItem>


        <ListItem onClick={handleClickOcasiones}>
          <ListItemIcon>
            <LocalFloristIcon />
          </ListItemIcon>
          <ListItemText primary="Ocasiones" />
          {openOcasiones ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOcasiones} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {ocasiones && ocasiones.map((item) => (
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{changeView("ocasion"), navigate("ocasion/"+item.nombre+"/"+item.id)}}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={item.nombre} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItem key={"Contacto"} disablePadding onClick={()=>{changeView("contacto"), navigate('/Contacto')}}>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Contacto"} />
          </ListItemButton>
        </ListItem>

        {
          datauser?
          (
            <>

              <ListItem key={datauser.name} disablePadding onClick={()=>{changeView("userid"), navigate("/Usuario/"+datauser.id)}}>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={datauser.name} />
                </ListItemButton>
              </ListItem>


              <ListItem key="LogOut" disablePadding onClick={handleLogOut}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="LogOut" />
                </ListItemButton>
              </ListItem>
            </>
          )
          :
          (

            <ListItem key={"Login"} disablePadding onClick={()=>{changeView("login"), navigate('/Login')}}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>

          )
        }
      </List>
    </Box>
  );


  // const shopCar = (anchor: Anchor) => (
  //   <Grid
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : {xs:350, md:450} }}
  //     role="presentation"
  //     // onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <Grid sx={{width:'100%', minHeight:'100vh', position: 'relative' }}>
  //       <Grid sx={{width:'100%'}}>
  //         <Typography variant="h1" color="initial"
  //         sx={{
  //           fontFamily: "Cormorant",
  //           fontOpticalSizing: "auto",
  //           fontWeight: "<weight>",
  //           fontStyle: "normal",
  //           fontSize:'30px'
  //         }} pl={'5%'} pt={'2%'} pb={'2%'}
  //         >Carrito</Typography>

  //         <Toolbar sx={{display:'block'}}>
  //           <Grid container pt={1}>
  //             <Grid item xs={3} >
  //               <img src="https://firebasestorage.googleapis.com/v0/b/prowlflores.appspot.com/o/multimedia%2Fimagenes%2Fproductos%2FC038-JARRON-DE-ROSAS-300x300.jpg?alt=media&token=c7e74236-7662-44fa-a5e2-c0b4ae5bfb12" alt="" style={{width:'100%', borderRadius:'10px'}}/>
  //             </Grid>
  //             <Grid item xs={9} p={1}>
  //               <Grid container >
  //                 <Grid item xs={8}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Nombre producto</Typography>
  //                 </Grid>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body2" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px',
  //                     textAlign:'end'
  //                   }}
  //                   >$346.10</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "bold",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Entrega</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >En tienda</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "bold",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Fecha</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   15/06/2024 12:00 - 16:00 pm
  //                 </Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "bold",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Dedicatoria</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //                 </Typography>
  //                 </Grid>
  //               </Grid>

  //             </Grid>

  //             <Grid item xs={12} sx={{
  //                   borderBlockWidth: '1px',
  //                   borderBottomColor: '#dadada',
  //                   borderBottomStyle: 'double'
  //             }}>
  //               <Grid container>
  //                 <Grid item xs={6} >
  //                   <Grid sx={{display:'flex'}}>
  //                     <Button>
  //                       +
  //                     </Button>
  //                     <Typography variant="subtitle1" color="initial">2</Typography>
  //                     <Button>
  //                       -
  //                     </Button>

  //                   </Grid>
  //                   {/* <TextField
  //                     id="outlined-number"
  //                     type="number"
  //                     variant="standard"
  //                     InputLabelProps={{
  //                       shrink: true,
  //                     }}
  //                   /> */}
  //                 </Grid>
  //                 <Grid item xs={6} sx={{textAlign:'end'}}>
  //                   <Button variant="text">
  //                     Eliminar
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //           <Grid container pt={1}>
  //             <Grid item xs={3}>
  //               <img src="https://firebasestorage.googleapis.com/v0/b/prowlflores.appspot.com/o/multimedia%2Fimagenes%2Fproductos%2FC038-JARRON-DE-ROSAS-300x300.jpg?alt=media&token=c7e74236-7662-44fa-a5e2-c0b4ae5bfb12" alt="" style={{width:'100%', borderRadius:'10px'}}/>
  //             </Grid>
  //             <Grid item xs={9} p={1}>
  //               <Grid container >
  //                 <Grid item xs={8}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Nombre producto</Typography>
  //                 </Grid>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body2" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px',
  //                     textAlign:'end'
  //                   }}
  //                   >$346.10</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Entrega</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >En tienda</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Fecha</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   15/06/2024 12:00 - 16:00 pm
  //                 </Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Dedicatoria</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //                 </Typography>
  //                 </Grid>
  //               </Grid>

  //             </Grid>

  //             <Grid item xs={12} sx={{
  //                   borderBlockWidth: '1px',
  //                   borderBottomColor: '#dadada',
  //                   borderBottomStyle: 'double'
  //             }}>
  //               <Grid container>
  //                 <Grid item xs={6} >
  //                   <Grid sx={{display:'flex'}}>
  //                     <Button>
  //                       +
  //                     </Button>
  //                     <Typography variant="subtitle1" color="initial">2</Typography>
  //                     <Button>
  //                       -
  //                     </Button>

  //                   </Grid>
  //                   {/* <TextField
  //                     id="outlined-number"
  //                     type="number"
  //                     variant="standard"
  //                     InputLabelProps={{
  //                       shrink: true,
  //                     }}
  //                   /> */}
                    
  //                 </Grid>
  //                 <Grid item xs={6} sx={{textAlign:'end'}}>
  //                   <Button variant="text">
  //                     Eliminar
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //           <Grid container pt={1}>
  //             <Grid item xs={3}>
  //               <img src="https://firebasestorage.googleapis.com/v0/b/prowlflores.appspot.com/o/multimedia%2Fimagenes%2Fproductos%2FC038-JARRON-DE-ROSAS-300x300.jpg?alt=media&token=c7e74236-7662-44fa-a5e2-c0b4ae5bfb12" alt="" style={{width:'100%', borderRadius:'10px'}}/>
  //             </Grid>
  //             <Grid item xs={9} p={1}>
  //               <Grid container >
  //                 <Grid item xs={8}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Nombre producto</Typography>
  //                 </Grid>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body2" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px',
  //                     textAlign:'end'
  //                   }}
  //                   >$346.10</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Entrega</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >En tienda</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Fecha</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   15/06/2024 12:00 - 16:00 pm
  //                 </Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Dedicatoria</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //                 </Typography>
  //                 </Grid>
  //               </Grid>

  //             </Grid>

  //             <Grid item xs={12} sx={{
  //                   borderBlockWidth: '1px',
  //                   borderBottomColor: '#dadada',
  //                   borderBottomStyle: 'double'
  //             }}>
  //               <Grid container>
  //                 <Grid item xs={6} >
  //                   <Grid sx={{display:'flex'}}>
  //                     <Button>
  //                       +
  //                     </Button>
  //                     <Typography variant="subtitle1" color="initial">2</Typography>
  //                     <Button>
  //                       -
  //                     </Button>

  //                   </Grid>
  //                   {/* <TextField
  //                     id="outlined-number"
  //                     type="number"
  //                     variant="standard"
  //                     InputLabelProps={{
  //                       shrink: true,
  //                     }}
  //                   /> */}
                    
  //                 </Grid>
  //                 <Grid item xs={6} sx={{textAlign:'end'}}>
  //                   <Button variant="text">
  //                     Eliminar
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //           <Grid container pt={1}>
  //             <Grid item xs={3}>
  //               <img src="https://firebasestorage.googleapis.com/v0/b/prowlflores.appspot.com/o/multimedia%2Fimagenes%2Fproductos%2FC038-JARRON-DE-ROSAS-300x300.jpg?alt=media&token=c7e74236-7662-44fa-a5e2-c0b4ae5bfb12" alt="" style={{width:'100%', borderRadius:'10px'}}/>
  //             </Grid>
  //             <Grid item xs={9} p={1}>
  //               <Grid container >
  //                 <Grid item xs={8}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Nombre producto</Typography>
  //                 </Grid>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body2" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px',
  //                     textAlign:'end'
  //                   }}
  //                   >$346.10</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Entrega</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >En tienda</Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Fecha</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   15/06/2024 12:00 - 16:00 pm
  //                 </Typography>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={4}>
  //                   <Typography variant="body1" color="initial"
  //                   sx={{
  //                     fontFamily: "Cormorant",
  //                     fontOpticalSizing: "auto",
  //                     fontWeight: "<weight>",
  //                     fontStyle: "normal",
  //                     fontSize:'15px'
  //                   }}
  //                   >Dedicatoria</Typography>
  //                 </Grid>
  //                 <Grid item xs={8}>
  //                 <Typography variant="body2" color="initial"
  //                 sx={{
  //                   fontFamily: "Cormorant",
  //                   fontOpticalSizing: "auto",
  //                   fontWeight: "<weight>",
  //                   fontStyle: "normal",
  //                   fontSize:'15px',
  //                   textAlign:'end'
  //                 }}
  //                 >
  //                   Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //                 </Typography>
  //                 </Grid>
  //               </Grid>

  //             </Grid>

  //             <Grid item xs={12} sx={{
  //                   borderBlockWidth: '1px',
  //                   borderBottomColor: '#dadada',
  //                   borderBottomStyle: 'double'
  //             }}>
  //               <Grid container>
  //                 <Grid item xs={6} >
  //                   <Grid sx={{display:'flex'}}>
  //                     <Button>
  //                       +
  //                     </Button>
  //                     <Typography variant="subtitle1" color="initial">2</Typography>
  //                     <Button>
  //                       -
  //                     </Button>

  //                   </Grid>
  //                   {/* <TextField
  //                     id="outlined-number"
  //                     type="number"
  //                     variant="standard"
  //                     InputLabelProps={{
  //                       shrink: true,
  //                     }}
  //                   /> */}
                    
  //                 </Grid>
  //                 <Grid item xs={6} sx={{textAlign:'end'}}>
  //                   <Button variant="text">
  //                     Eliminar
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //         </Toolbar>
  //       </Grid>
  //       <Grid sx={{width:'100%', backgroundColor:'#fee7ea', alignContent:'center', padding:'2%', position: 'sticky', bottom: '0'}} >
  //         {/* <Typography variant="h1" color="initial">adios</Typography> */}
  //           <Grid container mt={3} mb={3}>
  //             <Grid item xs={8}>
  //               <Typography variant="body1" color="initial" sx={{fontWeight: "bold",}}>Subtotal</Typography>
  //               <Typography variant="body2" color="initial">Precios sujetos a cambios sin previo aviso.</Typography>
  //             </Grid>
  //             <Grid item xs={4}>
  //               <Typography variant="body1" color="initial"  sx={{textAlign:'end'}}>
  //                 $5900
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //           <Button sx={{ width:"100%", backgroundColor:'black', color:'white'}} >
  //             Completar pedido
  //           </Button>
  //       </Grid>
  //     </Grid>

  //   </Grid>
  // );


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorE2);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleScroll = () => {
    const scrollTop = window.scrollY;
    // console.log(scrollTop)
    if (scrollTop == 0) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  };
  window.addEventListener('scroll', handleScroll);

  return (
    <>


      <Grid sx={isScrolled ? {display:'none'} : stylesComponents.appSubBar} >
        <Grid sx={{width:'50%', alignSelf:'center', display:'flex'}}>
          <Typography variant="body2" color="initial" sx={{fontSize:'13px'}}>Flores Rickys Envíos a Monterrey y área metropolitana</Typography>
        </Grid>
        <Grid sx={{width:'50%', textAlign:'end' }}>
          <Button sx={{borderRadius:'30px', backgroundColor:'black', color:'white', paddingLeft:'20px', paddingRight:'20px', fontSize:'10px'}}>WhatsApp →</Button>
        </Grid>
      </Grid>

      <AppBar sx={isScrolled ? stylesComponents.appBarScrolled : stylesComponents.appBar}>
        <Grid sx={isScrolled ? stylesComponents.appSubBar : {display:'none'}}>
          <Grid sx={{width:'50%', alignSelf:'center', display:'flex'}}>
            <Typography variant="body2" color="initial" sx={{fontSize:'13px'}}>Flores Rickys Envíos a Monterrey y área metropolitana</Typography>
          </Grid>
          <Grid sx={{width:'50%', textAlign:'end' }}>
            <Button sx={{borderRadius:'30px', backgroundColor:'black', color:'white', paddingLeft:'20px', paddingRight:'20px', fontSize:'10px'}}>WhatsApp →</Button>
          </Grid>
        </Grid>

        <Container maxWidth="xl" >
          <Grid sx={ isScrolled ? {display:'flex', marginTop:'10px', paddingLeft:'5%', paddingRight:'5%'} : {display:'flex', marginTop:'10px', paddingLeft:'5%', paddingRight:'5%', borderBottomStyle:'grove'}  }  >


            {/* logo */}
            <Grid
              sx={{
                width:'30%',
                // display: { xs: 'none', md: 'flex' },
              }}
            >
              <img
              src={Logo}
              alt="Logo"
              style={{ width: '90px' }}
            />
            </Grid>

            {/* Menu escritorio */}
            <Grid
              sx={{width:'70%', display:{xs:'none', md:'flex'}, justifyContent:'end'}}
            >
              <Button
                sx={isScrolled ? stylesComponents.butonMenuScroll : currentView=="/"?stylesComponents.butonMenu:stylesComponents.butonMenu2}
                onClick={()=>{changeView("/"), navigate('/')}}
              >Inicio</Button>
              <Button
                sx={isScrolled ? stylesComponents.butonMenuScroll : currentView=="/"?stylesComponents.butonMenu:stylesComponents.butonMenu2}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Ocasiones
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {ocasiones && ocasiones.map((item) => (
                  <MenuItem onClick={()=>{changeView("ocasion"), navigate("ocasion/"+item.nombre+"/"+item.id)}}>{item.nombre}</MenuItem>
                ))}
              </Menu>
              {/* <Button
                sx={isScrolled ? stylesComponents.butonMenuScroll : stylesComponents.butonMenu}
              >Ocasiones</Button> */}
              <Button
                sx={isScrolled ? stylesComponents.butonMenuScroll : currentView=="/"?stylesComponents.butonMenu:stylesComponents.butonMenu2}
                onClick={()=>{changeView("contacto"), navigate('/newContacto')}}
              >Contacto</Button>

            {
              datauser?
                (
                  <>
                  <Button
                    sx={isScrolled ? stylesComponents.butonMenuScroll : currentView=="/"?stylesComponents.butonMenu:stylesComponents.butonMenu2}
                    id="basic-button2"
                    aria-controls={open2 ? 'basic-menu2' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open2 ? 'true' : undefined}
                    onClick={handleClick2}
                  >
                    {datauser.name}
                  </Button>
                    <Menu
                      id="basic-menu2"
                      anchorEl={anchorE2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button2',
                      }}
                    >
                      <MenuItem onClick={()=>{changeView("userid"), navigate("/Usuario/"+datauser.id)}}>Perfil</MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  </>
                )
                :
                (

                <Button
                  sx={isScrolled ? stylesComponents.butonMenuScroll : currentView=="/"?stylesComponents.butonMenu:stylesComponents.butonMenu2}
                  onClick={()=>{changeView("login"), navigate('/Login')}}
                >
                  Login
                </Button>

                )
              }
            </Grid>

            {/* Boton carrito */}
            <Grid sx={{
              width:{
                md:'auto',
                xs:'70%'
              },
              textAlign:'end'
            }}>
              <Button
                sx={isScrolled ? stylesComponents.butonMenuCarritoScroll : currentView=="/" ? stylesComponents.butonMenuCarrito:stylesComponents.butonMenuCarrito2}
                onClick={toggleDrawer("right", true)}
              ><ShoppingCartIcon sx={{fontSize:'15px'}}/> Total (${precioAPagar})</Button>
            </Grid>

            {/* Menu movil */}
            <Grid sx={currentView=="/"?stylesComponents.menuResponsivo:stylesComponents.menuResponsivo2} onClick={toggleDrawer("left", true)}>
              <MenuIcon/>
            </Grid>

          </Grid>
        </Container>

      </AppBar>




      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {/* <ShopingCarNav anchor={'right'}/> */}

        <ShopingCarNav/>

        {/* {shopCar("right")} */}
      </Drawer>
    </>
  );
}
export default ResponsiveAppBar;