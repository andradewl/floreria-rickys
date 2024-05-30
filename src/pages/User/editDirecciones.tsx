/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { getDireccionById, updateDireccion } from "../../config/backEndUsuarios/backUbicaciones";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { NotificacionSuccess, Notificacionerror } from "../../components/Alert";

export default function editDirecciones() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [direccion, setDireccion] = useState<any>(null);
  const [nTipo, setTipo] = useState<string>("residencia");
  const [notiError, setNotiError ] = React.useState(false);
  const [notiSucces, setNotiSucces ] = React.useState(false);
  // const [notiInfo, ] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

  const handleRegresar = () => {
    navigate(`/Usuario/${id}`);
  };

  useEffect(() => {
    const fetchDireccion = async () => {
      try {
        if (id) {
          const direccionData = await getDireccionById(id);
          setDireccion(direccionData);
        } else {
          console.error("La ID de la dirección es indefinida.");
        }
      } catch (error) {
        console.error("Error al obtener dirección:", error);
      }
    };

    fetchDireccion();
  }, [id]);

  const handleChangeTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };

  const handleUpdateDireccion = async () => {
    try {
      if (direccion) {
        await updateDireccion(direccion.id, direccion.nombre, direccion.apellido, direccion.zip, direccion.estado, direccion.municipio, direccion.colonia, direccion.calle, direccion.NumE, direccion.NumI, direccion.refCalle1, direccion.refCalle2, nTipo, direccion.telRemitente, direccion.telDestinatario, direccion.referencias, direccion.relUsuario);
        console.log("Dirección actualizada exitosamente.");
        setMensajeNotificacion("Dirección actualizada correctamente")
        setNotiSucces(true)
        setTimeout(() => {
          setNotiSucces(false)
        }, 2000);
        // alert("Dirección actualizada correctamente");
        navigate("/Usuario/:id");
      } else {
        setMensajeNotificacion("No se ha cargado ninguna dirección.")
        setNotiError(true)
        setTimeout(() => {
          setNotiError(false)
        }, 2000);
        // console.error("No se ha cargado ninguna dirección.");
      }
    } catch (error) {
      setMensajeNotificacion("Error al actualizar dirección, intentelo de nuevo...")
        setNotiError(true)
        setTimeout(() => {
          setNotiError(false)
        }, 2000);
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={4} justifyContent="center" sx={{ py: 12 }}>
        <Grid item container spacing={2} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Grid item xs={12}>
            <Button startIcon={<ArrowBackIcon />} onClick={handleRegresar}>
              Regresar
            </Button>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Editar dirección de entrega.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="nombreDestino"
              margin="dense"
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              value={direccion?.nombre || ""}
              onChange={(event) => setDireccion({ ...direccion, nombre: event.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="apellidoDestino"
              margin="dense"
              required
              label="Apellido"
              variant="outlined"
              fullWidth
              value={direccion?.apellido || ""}
              onChange={(event) => setDireccion({ ...direccion, apellido: event.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="codigoPostal"
              margin="dense"
              required
              label="Código Postal"
              variant="outlined"
              fullWidth
              value={direccion?.zip || ""}
              onChange={(event) => setDireccion({ ...direccion, zip: event.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="estado"
              margin="dense"
              required
              label="Estado"
              variant="outlined"
              fullWidth
              value={direccion?.estado || ""}
              onChange={(event) => setDireccion({ ...direccion, estado: event.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="municipio"
              margin="dense"
              required
              label="Municipio o Alcaldía"
              variant="outlined"
              fullWidth
              value={direccion?.municipio || ""}
              onChange={(event) => setDireccion({ ...direccion, municipio: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="colonia"
              margin="dense"
              required
              label="Colonia"
              variant="outlined"
              fullWidth
              value={direccion?.colonia || ""}
              onChange={(event) => setDireccion({ ...direccion, colonia: event.target.value })}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="calle"
              margin="dense"
              required
              label="Calle"
              variant="outlined"
              fullWidth
              value={direccion?.calle || ""}
              onChange={(event) => setDireccion({ ...direccion, calle: event.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="numExt"
              margin="dense"
              required
              label="Número Exterior"
              variant="outlined"
              fullWidth
              value={direccion?.NumE || ""}
              onChange={(event) => setDireccion({ ...direccion, NumE: event.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="numInt"
              margin="dense"
              label="Número Interior"
              variant="outlined"
              fullWidth
              value={direccion?.NumI || ""}
              onChange={(event) => setDireccion({ ...direccion, NumI: event.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="calleRef1"
              margin="dense"
              label="Calle de Referencia 1"
              variant="outlined"
              fullWidth
              value={direccion?.refCalle1 || ""}
              onChange={(event) => setDireccion({ ...direccion, refCalle1: event.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="calleRef2"
              margin="dense"
              label="Calle de Referencia 2"
              variant="outlined"
              fullWidth
              value={direccion?.refCalle2 || ""}
              onChange={(event) => setDireccion({ ...direccion, refCalle2: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              ¿Es trabajo o casa?
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="tipo"
                name="tipo"
                value={nTipo}
                onChange={handleChangeTipo}
              >
                <FormControlLabel
                  value="residencia"
                  control={<Radio />}
                  label="Residencia"
                />
                <FormControlLabel
                  value="trabajo"
                  control={<Radio />}
                  label="Trabajo"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="telRemitente"
              margin="dense"
              required
              label="Teléfono de Remitente"
              variant="outlined"
              fullWidth
              value={direccion?.telRemitente || ""}
              onChange={(event) => setDireccion({ ...direccion, telRemitente: event.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="telDestinatario"
              margin="dense"
              required
              label="Teléfono de Destinatario"
              variant="outlined"
              fullWidth
              value={direccion?.telDestinatario || ""}
              onChange={(event) => setDireccion({ ...direccion, telDestinatario: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="referencias"
              margin="dense"
              label="Referencias"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={direccion?.referencias || ""}
              onChange={(event) => setDireccion({ ...direccion, referencias: event.target.value })}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button onClick={handleUpdateDireccion}>Guardar cambios</Button>
          </Grid>
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
