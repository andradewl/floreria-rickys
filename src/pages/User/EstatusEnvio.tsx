/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { getPedidosUsuario } from "../../config/backEndUsuarios/backEstatus";

interface Pedido {
  nombre: string;
  cantidad: number;
  total: number;
  fecha: string;
  estatusEnv: string;
  imagen: string; // Agregamos el campo imagen al tipo Pedido
}

export default function EstatusEnvio() {
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("userlogIn") || "{}").id;

    if (userId) {
      async function fetchPedidos() {
        try {
          const pedidosData = await getPedidosUsuario(userId);
          setPedidos(pedidosData);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        }
      }

      fetchPedidos();
    } else {
      console.error("ID de usuario no encontrado en sessionStorage.");
    }
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', paddingBottom: '2%', fontFamily: "Cormorant", }}>
          Estatus de Envío
        </Typography>
        
        {/* Barra de búsqueda y botón de filtro */}
        <Box display="flex" justifyContent="center" sx={{ maxWidth: 800, margin: '0 auto 20px auto' }}>
          <TextField
            label="Buscar"
            variant="outlined"
            sx={{ flex: 1, marginRight: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            startIcon={<FilterListIcon />}
          >
            Filtrar
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Fecha</MenuItem>
            <MenuItem onClick={handleClose}>Cantidad</MenuItem>
            <MenuItem onClick={handleClose}>Total</MenuItem>
            <MenuItem onClick={handleClose}>Estatus</MenuItem>
          </Menu>
        </Box>

        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '0 auto', border: '2px solid', borderColor: 'primary.main', borderRadius: 2, boxShadow: 5 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Imagen</TableCell> {/* Agregamos la columna para la imagen */}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Estatus de Envío</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos &&
                pedidos.map((pedido: Pedido, index: number) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:nth-of-type(even)': { backgroundColor: 'background.default' } }}>
                    <TableCell>{pedido.nombre}</TableCell>
                    <TableCell>
                      <img src={pedido.imagen} alt="Imagen del producto" style={{ width: 50, height: 50 }} />
                    </TableCell> {/* Mostramos la imagen */}
                    <TableCell align="right">{pedido.cantidad}</TableCell>
                    <TableCell align="right">{pedido.total}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: (() => {
                          switch (pedido.estatusEnv) {
                            case "Preparando":
                              return "#FFA500"; // Naranja
                            case "En camino":
                              return "#0000FF"; // Azul
                            case "Enviado":
                              return "#FFD700"; // Amarillo
                            case "Entregado":
                              return "#008000"; // Verde
                            default:
                              return "inherit";
                          }
                        })(),
                        fontWeight: "bold",
                      }}
                    >
                      {pedido.estatusEnv}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <tfoot>
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', padding: 2 }}>
                  Fin del Estatus de Envío
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
