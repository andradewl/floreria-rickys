import { Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Icon } from "@mui/material";
import { useState } from "react";
import { agregarRegistroContacto } from "../config/backEndUsuarios/backContacto";
import React from "react";
import { NotificacionSuccess, Notificacionerror } from "../components/Alert";

// Definir un tipo para el icono
type IconType = React.ReactElement<typeof Icon>;

function Contacto() {

  const [notiError, setNotiError ] = React.useState(false);
  const [notiSucces, setNotiSucces ] = React.useState(false);
  // const [notiInfo, ] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correoElectronico: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await agregarRegistroContacto(formData);
      setMensajeNotificacion("Mensaje enviado correctamente")
      setNotiSucces(true)
      setTimeout(() => {
        setNotiSucces(false)
      }, 2000);
      // alert("Mensaje enviado correctamente");
      setFormData({
        nombre: "",
        apellido: "",
        correoElectronico: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    } catch (error) {
      console.error(error);

      setMensajeNotificacion("Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.")
      setNotiError(true)
      setTimeout(() => {
        setNotiError(false)
      }, 2000);
      // alert("Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    <>
      <Container sx={{
        background: 'linear-gradient(to bottom, #FCE4E5 50%, #FBF8F4 50%)',
        py: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
          <Typography textAlign="center" sx={{ fontFamily: "Times New Roman" }}>
                Contacto.
              </Typography>
          </Grid>
          <Grid item container xl={6} lg={6} md={6} sm={12} xs={12}>
            <Stack direction="column" spacing={3}>
              <ContactInfo icon={<SmartphoneIcon fontSize="medium" sx={{ color: "#C81987" }} />} text="(81) 34-11-32-74" />
              <ContactInfo icon={<MailOutlineIcon fontSize="medium" sx={{ color: "#C81987" }} />} text="Flores@floresricky.com" />
              <ContactInfo icon={<LocationOnIcon fontSize="medium" sx={{ color: "#C81987" }} />} text="C. Padre Mier 1355, Maria Luisa, Centro, 64000 Monterrey, N.L." />
              <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                Horario:
              </Typography>
              <ContactInfo icon={<AccessTimeIcon fontSize="medium" sx={{ color: "#C81987" }} />} text="Lunes a Domingo 8:00 a.m. a 20:00 p.m." />
            </Stack>
          </Grid>

          <Grid item container spacing={1} xl={6} lg={6} md={6} sm={12} xs={12}>
            <Grid item xs={6}>
              <TextField id="nombre" label="Nombre" variant="outlined" fullWidth value={formData.nombre} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="apellido" label="Apellido" variant="outlined" fullWidth value={formData.apellido} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="correoElectronico" label="Correo Electrónico" variant="outlined" fullWidth value={formData.correoElectronico} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="telefono" label="Teléfono" variant="outlined" fullWidth value={formData.telefono} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="asunto" label="Asunto" variant="outlined" fullWidth value={formData.asunto} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="mensaje" label="Mensaje" variant="outlined" rows={4} multiline fullWidth value={formData.mensaje} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" sx={{ color: "#B42981", borderColor: "#B42981", borderWidth: "3px" }} onClick={handleSubmit}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {notiError &&
        <Notificacionerror message={mensajeNotificacion}/>
      }

      {notiSucces &&
          <NotificacionSuccess message={mensajeNotificacion}/>
      }

  

    </>
  );
}

const ContactInfo = ({ icon, text }: { icon: IconType, text: string }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography>{text}</Typography>
  </Stack>
);

export default Contacto;
