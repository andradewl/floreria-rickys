import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId, actualizarProducto } from '../../config/backEndAdmin/backProductos';
import { Typography, Grid, TextField, Button, Box, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAuth } from 'firebase/auth'; // Importar getAuth para obtener el usuario actual
import { NotificacionSuccess } from '../../components/Alert'; // Importar NotificacionSuccess

const EditarProducto = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el id del URL
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  
  const [producto, setProducto] = useState<any>({
    nombre: '',
    precio: 0,
    existencias: 0,
    descripcion: '',
    descuento: 0,
    imagen: '',
    imagenFile: null,
  });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false); // Estado para la notificación de éxito

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        if (id) {
          const productoData = await obtenerProductoPorId(id); // Utilizar el id para cargar los datos del producto
          setProducto(productoData);
        } else {
          console.error('El ID del producto no está definido.');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
  
    fetchProducto();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === 'imagenFile' && files && files[0]) {
      setProducto({ ...producto, [name]: files[0], imagen: URL.createObjectURL(files[0]) });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleActualizarProducto = async () => {
    try {
      if (!user) {
        console.error('Usuario no autenticado.');
        return;
      }

      if (!id) {
        console.error('El ID del producto no está definido.');
        return;
      }

      // Verificar que todos los campos necesarios estén definidos
      if (
        !producto.nombre ||
        !producto.descripcion ||
        !producto.descuento ||
        !producto.existencias ||
        !producto.precio
      ) {
        console.error('Algunos campos del producto no están definidos.');
        return;
      }

      await actualizarProducto(
        id,
        producto.descripcion,
        producto.descuento,
        producto.existencias,
        producto.nombre,
        producto.precio,
        producto.imagenFile // Enviar la imagen como parte de la actualización
      );
      
      setShowSuccessNotification(true); // Mostrar la notificación de éxito
      setTimeout(() => {
        navigate(`/Usuario/${user.uid}`);
      }, 2500); // Esperar 2.5 segundos antes de redirigir
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };
  
  const handleRegresar = () => {
    navigate(`/Usuario/${user?.uid}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ py: 12 }}>
      <Grid item xs={12}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleRegresar}>
          Regresar
        </Button>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', paddingBottom: '2%', fontFamily: "Cormorant", }}>
          Editar Producto
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                value={producto.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descripcion"
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={producto.descripcion}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="precio"
                label="Precio"
                variant="outlined"
                fullWidth
                type="number"
                value={producto.precio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="existencias"
                label="Existencias"
                variant="outlined"
                fullWidth
                type="number"
                value={producto.existencias}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descuento"
                label="Descuento"
                variant="outlined"
                fullWidth
                type="number"
                value={producto.descuento}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                name="imagenFile"
                onChange={handleChange}
              />
            </Grid>
            {producto.imagen && (
              <Grid item xs={12}>
                <img src={producto.imagen} alt="Producto" style={{ maxWidth: '100%', maxHeight: '300px', margin: 'auto', display: 'block' }} />
              </Grid>
            )}
          </Grid>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button variant="contained" onClick={handleActualizarProducto}>Guardar cambios</Button>
          </Box>
        </Paper>
      </Grid>
      {showSuccessNotification && <NotificacionSuccess message="Producto actualizado correctamente, redirigiendo..." />}
    </Grid>
  );
};

export default EditarProducto;
