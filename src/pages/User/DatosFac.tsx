/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Divider, Grid, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getDireccionesUsuario, deleteDirFact } from "../../config/backEndUsuarios/backFacturacion";
import { DocumentData } from "@firebase/firestore-types";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";

export default function DatosFac() {
  const navigate = useNavigate();
  const [direcciones, setDirecciones] = React.useState<DocumentData[]>([]);
  const userId = JSON.parse(sessionStorage.getItem("userlogIn") || "{}").id;

  const DemoPaper = styled(Paper)(({ theme }) => ({
    position: "relative",
    width: "65%",
    padding: theme.spacing(2),
    textAlign: "left",
    margin: "auto",
  }));

  React.useEffect(() => {
    if (userId) {
      getDireccionesData();
    } else {
      console.error("ID de usuario no definido.");
    }
  }, [userId]);

  const getDireccionesData = async () => {
    try {
      const direccionesData = await getDireccionesUsuario(userId);
      setDirecciones(direccionesData);
    } catch (error) {
      console.error("Error al obtener direcciones:", error);
    }
  };

  const handleNuevoClick = () => {
    navigate("/FormDetaFac");
  };

  const borrarDireccion = async (id: string) => {
    await deleteDirFact(id);
    console.log("Dirección eliminada con éxito:", id);
    getDireccionesData();
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', paddingBottom: '2%', fontFamily: "Cormorant", }}>
        Datos de facturación
        </Typography>
        <DemoPaper variant="outlined">
          {direcciones.map((direccion, index) => (
            <div
              key={index}
              style={{ position: "relative", marginBottom: "1rem" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <BusinessIcon sx={{ marginRight: "0.5rem" }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.2rem", flex: 1 }}
                >
                  {direccion.apellido}, {direccion.nombre} - {direccion.empresa}
                </Typography>
                <Link to={`/editDireccionFact/${direccion.id}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() => borrarDireccion(direccion.id)}
                  aria-label="eliminar"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <Typography variant="body1">
                {direccion.pais} - {direccion.zip} - {direccion.estado}
              </Typography>
              <Typography variant="body1">
                {direccion.municipio} - {direccion.colonia} - {direccion.calle}
              </Typography>
              <Typography variant="body1">
                Número Exterior: {direccion.NumE} - Número Interior:{" "}
                {direccion.NumI}.
              </Typography>
              <Typography variant="body1">
                {direccion.telefono} - {direccion.email}.
              </Typography>
              <Divider sx={{ marginTop: "1.5%", marginBottom: "1.5%" }} />
            </div>
          ))}
          <Button variant="text" onClick={handleNuevoClick} fullWidth>
            Agregar nueva dirección de facturación.
          </Button>
        </DemoPaper>
      </Grid>
    </Grid>
  );
}
