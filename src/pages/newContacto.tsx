import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NotificacionSuccess, Notificacionerror } from "../components/Alert";

function NewContacto() {

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Aquí iría tu lógica para enviar el formulario
      setMensajeNotificacion("Mensaje enviado correctamente")
      setNotiSucces(true)
      setTimeout(() => {
        setNotiSucces(false)
      }, 2000);
      // alert("");
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
      // alert(
      //   "Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde."
      // );
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          py: 10,
          backgroundImage:
            "linear-gradient(to bottom, #FCE4E5 50%, #FBF8F4 10%, #FBF8F4 100%)",
        }}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Restora",
              fontSize: "2.25rem",
              marginBottom: "50px",
            }}
          >
            Contacto
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={8} xl={8} sx={{ marginTop: "1px" }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Grid container spacing={2} sx={{ marginLeft: "2rem" }}>
              <Grid
                item
                container
                spacing={1}
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "Restora",
                      marginBottom: "1rem",
                      marginTop: "3rem",
                    }}
                  >
                    Envíanos un mensaje.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="apellido"
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="correoElectronico"
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    value={formData.correoElectronico}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="telefono"
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="asunto"
                    label="Asunto"
                    variant="outlined"
                    fullWidth
                    value={formData.asunto}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="mensaje"
                    label="Mensaje"
                    variant="outlined"
                    rows={2}
                    multiline
                    fullWidth
                    value={formData.mensaje}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      color: "#FFFF",
                      backgroundColor: "#FB7185",
                      "&:hover": { backgroundColor: "#F43F5E" },
                      marginBottom: "3.5rem",
                    }}
                    onClick={handleSubmit}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                sx={{ marginTop: "3rem" }}
              >
                <Stack direction="column" spacing={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SmartphoneIcon fontSize="medium" sx={{ color: "#C81987" }} />
                    <Stack direction="column" spacing={1}>
                      <Typography sx={{ fontFamily: "Restora" }}>
                        Teléfono
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        81 8342 3548
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        81 8344 5333
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        81 3264 5427 (WhatsApp)
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailOutlineIcon fontSize="medium" sx={{ color: "#C81987" }} />
                    <Stack direction="column" spacing={1}>
                      <Typography sx={{ fontFamily: "Restora" }}>
                        Correo Electrónico
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        comercializadora.floreselgato@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon fontSize="medium" sx={{ color: "#C81987" }} />
                    <Stack direction="column" spacing={1}>
                      <Typography sx={{ fontFamily: "Restora" }}>
                        Ubicación
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        Venustiano Carranza 502
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        Col. María Luisa – CP 64000
                      </Typography>
                      <Typography sx={{ fontFamily: "Arial" }}>
                        Monterrey, Nuevo León
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {notiError &&
        <Notificacionerror message={mensajeNotificacion}/>
      }

      {notiSucces &&
          <NotificacionSuccess message={mensajeNotificacion}/>
      }
      
    </>
  );
}

export default NewContacto;
