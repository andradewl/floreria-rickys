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
import { useNavigate } from "react-router-dom";
import { addDireccion } from "../../config/backEndUsuarios/backUbicaciones";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { NotificacionSuccess } from "../../components/Alert";

export default function FormUbicaciones() {
  const navigate = useNavigate();
  const [nombreDestino, setNombreDestino] = useState<string>("");
  const [apellidoDestino, setApellidoDestino] = useState<string>("");
  const [codigoPostal, setCodigoPostal] = useState<string>("");
  const [nEstado, setEstado] = useState<string>("");
  const [nMunicipio, setMunicipio] = useState<string>("");
  const [nColonia, setColonia] = useState<string>("");
  const [nCalle, setCalle] = useState<string>("");
  const [numExt, setNumExt] = useState<string>("");
  const [numInt, setNumInt] = useState<string>("");
  const [calleRef1, setCalleRef1] = useState<string>("");
  const [calleRef2, setCalleRef2] = useState<string>("");
  const [nTipo, setTipo] = useState<string>("residencia");
  const [telRemitente, setTelRemitente] = useState<string>("");
  const [telDestinatario, setTelDestinatario] = useState<string>("");
  const [nReferencias, setReferencias] = useState<string>("");

  const userId = JSON.parse(sessionStorage.getItem("userlogIn") || "{}").id;

  const [notiSucces, setNotiSucces ] = React.useState(false);
  // const [notiInfo, ] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

  const handleRegresar = () => {
    navigate("/Usuario/:id");
  };

  const handleChangeTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };

  const addNewDireccion = () => {
    addDireccion(
      nombreDestino,
      apellidoDestino,
      codigoPostal,
      nEstado,
      nMunicipio,
      nColonia,
      nCalle,
      numExt,
      numInt,
      calleRef1,
      calleRef2,
      nTipo,
      telRemitente,
      telDestinatario,
      nReferencias,
      userId
    );
    setMensajeNotificacion("Dirección guardada correctamente")
    setNotiSucces(true)
    setTimeout(() => {
      setNotiSucces(false)
    }, 2000);
    // alert("Dirección guardada correctamente");
    navigate("/Usuario/:id");
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
              Agregar Nueva Direccion de Entrega.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              margin="dense"
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombreDestino}
              onChange={(e) => setNombreDestino(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              margin="dense"
              required
              label="Apellido"
              variant="outlined"
              fullWidth
              value={apellidoDestino}
              onChange={(e) => setApellidoDestino(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Codigo Postal"
              variant="outlined"
              defaultValue="64000"
              fullWidth
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-disabled"
              label="Estado"
              variant="outlined"
              defaultValue="Nuevo León"
              fullWidth
              value={nEstado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="Municipio o Alcaldía"
              variant="outlined"
              defaultValue="Monterrey"
              fullWidth
              value={nMunicipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              label="Colonia"
              defaultValue="Centro"
              fullWidth
              value={nColonia}
              onChange={(e) => setColonia(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              required
              label="Calle"
              variant="outlined"
              fullWidth
              value={nCalle}
              onChange={(e) => setCalle(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Número Exterior"
              variant="outlined"
              fullWidth
              value={numExt}
              onChange={(e) => setNumExt(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Número Interior"
              variant="outlined"
              fullWidth
              value={numInt}
              onChange={(e) => setNumInt(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              ¿Entre qué calles está? (Opcional)
            </Typography>
            <TextField
              id="outlined-basic"
              label="Calle 1"
              variant="outlined"
              fullWidth
              value={calleRef1}
              onChange={(e) => setCalleRef1(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              .
            </Typography>
            <TextField
              id="outlined-basic"
              label="Calle 2"
              variant="outlined"
              fullWidth
              value={calleRef2}
              onChange={(e) => setCalleRef2(e.target.value)}
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
              id="outlined-basic"
              label="Teléfono de remitente"
              variant="outlined"
              required
              fullWidth
              value={telRemitente}
              onChange={(e) => setTelRemitente(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Teléfono de destinatario"
              variant="outlined"
              fullWidth
              value={telDestinatario}
              onChange={(e) => setTelDestinatario(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Indicacciones adicionales de la dirección"
              multiline
              required
              rows={4}
              fullWidth
              value={nReferencias}
              onChange={(e) => setReferencias(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={addNewDireccion}
              sx={{
                width: "fit-content",
                color: "#B42981",
                borderColor: "#B42981",
                borderWidth: "3px",
              }}
            >
              Guardar Dirección
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {notiSucces &&
          <NotificacionSuccess message={mensajeNotificacion}/>
      }
    </>
  );
}
