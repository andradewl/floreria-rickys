import { Button, Grid, TextField, Typography } from "@mui/material";
import { addDirFact } from "../../config/backEndUsuarios/backFacturacion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { NotificacionSuccess } from "../../components/Alert";

export default function FormDetaFac() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [empresaDirFact, setEmpresaDirFact] = useState<string>("");
  const [paisDirFact, setPaisDirFact] = useState<string>("");
  const [codigoPostal, setCodigoPostal] = useState<string>("");
  const [nEstado, setEstado] = useState<string>("");
  const [nMunicipio, setMunicipio] = useState<string>("");
  const [nColonia, setColonia] = useState<string>("");
  const [nCalle, setCalle] = useState<string>("");
  const [numExt, setNumExt] = useState<string>("");
  const [numInt, setNumInt] = useState<string>("");
  const [calleRef1, setCalleRef1] = useState<string>("");
  const [calleRef2, setCalleRef2] = useState<string>("");
  const [telefonoDirFact, setTelefonoDirFact] = useState<string>("");
  const [emailDirFact, setEmailDirFact] = useState<string>("");
  const userId = JSON.parse(sessionStorage.getItem("userlogIn") || "{}").id;

  // const [notiError, setNotiError ] = React.useState(false);
  const [notiSucces, setNotiSucces ] = React.useState(false);
  // const [notiInfo, ] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

  const handleRegresar = () => {
    navigate("/Usuario/:id");
  };

  const addNewDireccionFacturacion = () => {
    addDirFact(
      nombre,
      apellido,
      empresaDirFact,
      paisDirFact,
      codigoPostal,
      nEstado,
      nMunicipio,
      nColonia,
      nCalle,
      numExt,
      numInt,
      calleRef1,
      calleRef2,
      telefonoDirFact,
      emailDirFact,
      userId
    );
    setMensajeNotificacion("Dirección de facturación guardada correctamente")
    setNotiSucces(true)
    setTimeout(() => {
      setNotiSucces(false)
    }, 2000);
    // alert("Dirección de facturación guardada correctamente");
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
              Dirección de Facturación
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Empresa (Opcional)"
              variant="outlined"
              fullWidth
              value={empresaDirFact}
              onChange={(e) => setEmpresaDirFact(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="País"
              variant="outlined"
              fullWidth
              value={paisDirFact}
              onChange={(e) => setPaisDirFact(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Código Postal"
              variant="outlined"
              fullWidth
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Estado"
              variant="outlined"
              fullWidth
              value={nEstado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Municipio o Alcaldía"
              variant="outlined"
              fullWidth
              value={nMunicipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Colonia"
              variant="outlined"
              fullWidth
              value={nColonia}
              onChange={(e) => setColonia(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Número Exterior"
              variant="outlined"
              fullWidth
              value={numExt}
              onChange={(e) => setNumExt(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
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
            <TextField
              id="outlined-basic"
              label="Calle 2"
              variant="outlined"
              fullWidth
              value={calleRef2}
              onChange={(e) => setCalleRef2(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Teléfono"
              variant="outlined"
              required
              fullWidth
              value={telefonoDirFact}
              onChange={(e) => setTelefonoDirFact(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              value={emailDirFact}
              onChange={(e) => setEmailDirFact(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={addNewDireccionFacturacion}
              sx={{
                width: "fit-content",
                color: "#B42981",
                borderColor: "#B42981",
                borderWidth: "3px",
              }}
            >
              Guardar Dirección de Facturación
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
