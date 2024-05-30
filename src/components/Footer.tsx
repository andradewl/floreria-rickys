import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram } from "@mui/icons-material";
import { Box } from "@mui/material";
import Logo from '../assets/logo.png'
import { stylesComponents } from "../styles/stylesComponentes";


function Footer(){
    return(
        <Grid sx={stylesComponents.BoxFooter }>
            <Container >
                <Grid container sx={{
                    borderBottomStyle:'solid',
                    borderBottomWidth: '1px',
                    borderColor: '#cecccc',
                    paddingTop:'100px',
                    paddingBottom:'100px',
                }}>
                    <Grid item xs={12} md={3} p={1}>
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{width:'100px'}}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Nuestro horario de atención es de 8:00 am a 8:00 pm
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} style={{justifyContent:'center'}} p={1}>
                        <Typography variant="h5" color="text.primary" gutterBottom sx={{
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Flores Rickys
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            En Flores Rickys encuentra una gran variedad de diseños florales para eventos y toda ocasión.
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        {/* <Typography variant="body2" color="text.secondary">
                            Email: info@example.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +963 937 715 637
                        </Typography> */}
                    </Grid>
                    <Grid item xs={12} md={3} p={1}>
                        <Typography variant="h5" color="text.primary" gutterBottom sx={{
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Contacto
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Av. Venustiano Carranza No.502
                            Col. María Luisa – CP 64000
                            Monterrey, N.L.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Tel. 81 8342 3548
                        </Typography>
                        {/* <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link> */}
                    </Grid>
                    <Grid item xs={12} md={3} p={1}>
                        <Typography variant="h5" color="text.primary" gutterBottom sx={{
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Avisos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Términos y Condiciones
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            Aviso de Privacidad
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize:'15px',
                            fontFamily: "Cormorant",
                            fontOpticalSizing: "auto",
                            fontWeight: "<weight>",
                            fontStyle: "normal",
                        }}>
                            ¿Cómo comprar?
                        </Typography>
                    </Grid>
                </Grid>
                <Box pt={1} pb={10}>
                    <Typography variant="body2" color="text.secondary" align="center">
                    {" 2023 Copyright © "}
                    <Link color="inherit" href="https://your-website.com/">
                        | FLORES RICKYS | TODOS LOS DERECHOS RESERVADOS.


                    </Link>{" "}
                    </Typography>
                </Box>
            </Container>
        </Grid>
    )
}

export default Footer