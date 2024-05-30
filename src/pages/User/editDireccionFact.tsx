/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import {
  getDireccionFacturacionById,
  updateDireccionFacturacion,
} from "../../config/backEndUsuarios/backFacturacion";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { NotificacionSuccess, Notificacionerror } from "../../components/Alert";

export default function editDireccionFact() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [direccion, setDireccion] = React.useState<any>(null);
  const [notiError, setNotiError ] = React.useState(false);
  const [notiSucces, setNotiSucces ] = React.useState(false);
  // const [notiInfo, ] = React.useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = React.useState("");

  const handleRegresar = () => {
    navigate(`/Usuario/${id}`);
  };

  React.useEffect(() => {
    const fetchDireccion = async () => {
      try {
        if (id) {
          const direccionData = await getDireccionFacturacionById(id);
          setDireccion(direccionData);
        } else {
          console.error("La ID de la dirección es indefinida.");
        }
      } catch (error) {
        console.error("Error al obtener dirección de facturación:", error);
      }
    };

    fetchDireccion();
  }, [id]);

  const handleUpdateDireccion = async () => {
    try {
      if (direccion) {
        await updateDireccionFacturacion(
          direccion.id,
          direccion.nombre,
          direccion.apellido,
          direccion.empresa,
          direccion.pais,
          direccion.zip,
          direccion.estado,
          direccion.municipio,
          direccion.colonia,
          direccion.calle,
          direccion.NumE,
          direccion.NumI,
          direccion.refCalle1, // Agregar refCalle1
          direccion.refCalle2, // Agregar refCalle2
          direccion.telefono,
          direccion.email
        );
  
        console.log("Dirección de facturación actualizada exitosamente.");
        setMensajeNotificacion("Dirección de facturación actualizada correctamente")
        setNotiSucces(true)
        setTimeout(() => {
          setNotiSucces(false)
        }, 2000);
        // alert("Dirección de facturación actualizada correctamente");
        navigate(`/Usuario/${id}`);
      } else {
        setMensajeNotificacion("No se ha cargado ninguna dirección de facturación.")
        setNotiError(true)
        setTimeout(() => {
          setNotiError(false)
        }, 2000);
        // console.error("No se ha cargado ninguna dirección de facturación.");
      }
    } catch (error) {
      setMensajeNotificacion("Error al actualizar dirección de facturación:")
      setNotiError(true)
      setTimeout(() => {
        setNotiError(false)
      }, 2000);
      console.error( error);
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
              Editar dirección de facturación.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="nombre"
              margin="dense"
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              value={direccion?.nombre || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, nombre: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="apellido"
              margin="dense"
              required
              label="Apellido"
              variant="outlined"
              fullWidth
              value={direccion?.apellido || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, apellido: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="empresa"
              margin="dense"
              required
              label="Empresa"
              variant="outlined"
              fullWidth
              value={direccion?.empresa || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, empresa: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="pais"
              margin="dense"
              required
              label="País"
              variant="outlined"
              fullWidth
              value={direccion?.pais || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, pais: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="zip"
              margin="dense"
              required
              label="Código Postal"
              variant="outlined"
              fullWidth
              value={direccion?.zip || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, zip: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="estado"
              margin="dense"
              required
              label="Estado"
              variant="outlined"
              fullWidth
              value={direccion?.estado || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, estado: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="municipio"
              margin="dense"
              required
              label="Municipio"
              variant="outlined"
              fullWidth
              value={direccion?.municipio || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, municipio: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="colonia"
              margin="dense"
              required
              label="Colonia"
              variant="outlined"
              fullWidth
              value={direccion?.colonia || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, colonia: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="calle"
              margin="dense"
              required
              label="Calle"
              variant="outlined"
              fullWidth
              value={direccion?.calle || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, calle: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="numExt"
              margin="dense"
              required
              label="Número Exterior"
              variant="outlined"
              fullWidth
              value={direccion?.NumE || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, NumE: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="numInt"
              margin="dense"
              label="Número Interior"
              variant="outlined"
              fullWidth
              value={direccion?.NumI || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, NumI: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
            id="refCalle1"
            margin="dense"
            label="Referencia de Calle 1"
            variant="outlined"
            fullWidth
            value={direccion?.refCalle1 || ""}
            onChange={(event) =>
              setDireccion({ ...direccion, refCalle1: event.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="refCalle2"
            margin="dense"
            label="Referencia de Calle 2"
            variant="outlined"
            fullWidth
            value={direccion?.refCalle2 || ""}
            onChange={(event) =>
              setDireccion({ ...direccion, refCalle2: event.target.value })
            }
          />
        </Grid>
          <Grid item xs={6}>
            <TextField
              id="telefono"
              margin="dense"
              required
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={direccion?.telefono || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, telefono: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              margin="dense"
              required
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              value={direccion?.email || ""}
              onChange={(event) =>
                setDireccion({ ...direccion, email: event.target.value })
              }
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
