import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../../config/backEndAdmin/backProductos';
import { Typography, Grid, Paper, Container, Box, IconButton, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  existencias: number;
  imagen: string;
}

const ProductosAdmin = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await obtenerProductos();
        setProductos(productosData.map((producto: any) => ({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          existencias: producto.existencias,
          imagen: producto.imagen, // Agregar la URL de la imagen
        })));
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColor = (existencias: number) => {
    if (existencias <= 5) return 'red';
    if (existencias < 10) return 'orange';
    return 'green';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4}}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', paddingBottom: '2%', fontFamily: "Cormorant" }}>
        Productos en exhibición 
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <TextField
          label="Buscar Producto"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '70%' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/FormNvoProducto')}
        >
          Nuevo Producto
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredProductos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Paper
              elevation={3}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                {producto.imagen && (
                  <Box 
                    component="img"
                    src={producto.imagen}
                    alt={producto.nombre}
                    sx={{ 
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                )}
              </Box>
              <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{producto.nombre}</Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>${producto.precio.toFixed(2)}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: getColor(producto.existencias) }}
                >
                  Existencias: {producto.existencias}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Link to={`/editarProducto/${producto.id}`}>
                  <IconButton aria-label="editar">
                    <EditIcon />
                  </IconButton>
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductosAdmin;
