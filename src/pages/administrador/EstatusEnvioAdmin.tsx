import React from "react";
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
  Button,
  Tooltip,
  // TextField,
  // Box,
  Menu,
  MenuItem,
} from "@mui/material";
// import FilterListIcon from '@mui/icons-material/FilterList';
import { getPedidosUsuario, actualizarEstatusPedido } from "../../config/backEndAdmin/backEstatusAdmin";

interface Pedido {
  id: string; // Identificador único del pedido
  nombre: string;
  cantidad: number;
  total: number;
  fecha: string;
  estatusEnv: string;
  direccion: string;
  colonia: string;
  ciudad: string;
  cp: string;
  estado: string;
  telefono: string;
  nombreEnvio: string;
  imagen: string;
}

export default function EstatusEnvioAdministrador() {
  const [pedidos, setPedidos] = React.useState<Pedido[] | null>(null);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = React.useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    async function fetchPedidos() {
      try {
        const pedidosData = await getPedidosUsuario();
        setPedidos(pedidosData);
        
        // Crear un objeto con el estado de los botones deshabilitados
        const botonesDeshabilitadosInicial = pedidosData.reduce((acc, pedido) => {
          acc[pedido.id] = pedido.estatusEnv === "Entregado";
          return acc;
        }, {});
        setBotonesDeshabilitados(botonesDeshabilitadosInicial);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    }

    fetchPedidos();
  }, []);

  const handleActualizarEstatus = async (id: string) => {
    try {
      if (!pedidos) return;

      const pedidoToUpdate = pedidos.find((pedido) => pedido.id === id);
      if (!pedidoToUpdate) {
        console.error("Pedido no encontrado.");
        return;
      }

      let nuevoEstatus: string;
      switch (pedidoToUpdate.estatusEnv) {
        case "Preparando":
          nuevoEstatus = "Enviado";
          break;
        case "Enviado":
          nuevoEstatus = "En camino";
          break;
        case "En camino":
          nuevoEstatus = "Entregado";
          break;
        default:
          nuevoEstatus = "Preparando";
      }

      await actualizarEstatusPedido(id, nuevoEstatus);
      const pedidosActualizados = pedidos.map((pedido) => {
        if (pedido.id === id) {
          return { ...pedido, estatusEnv: nuevoEstatus };
        }
        return pedido;
      });
      setPedidos(pedidosActualizados);
      
      // Actualizar el estado del botón deshabilitado para este pedido
      setBotonesDeshabilitados({ ...botonesDeshabilitados, [id]: nuevoEstatus === "Entregado" });
    } catch (error) {
      console.error("Error al actualizar el estatus del pedido:", error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', paddingBottom: '2%', fontFamily: "Cormorant", }}>
          Estatus de Envío
        </Typography>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Preparando</MenuItem>
            <MenuItem onClick={handleClose}>Enviado</MenuItem>
            <MenuItem onClick={handleClose}>En camino</MenuItem>
            <MenuItem onClick={handleClose}>Entregado</MenuItem>
          </Menu>


        <TableContainer component={Paper} sx={{ maxWidth: 1500, margin: '0 auto', border: '2px solid', borderColor: 'primary.main', borderRadius: 2, boxShadow: 5 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="center">Imagen</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="center">Detalles</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Estatus de Envío</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }} align="right">Actualizar Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos ? (
                pedidos.map((pedido: Pedido) => (
                  <TableRow key={pedido.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:nth-of-type(even)': { backgroundColor: 'background.default' } }}>
                    <TableCell>{pedido.nombre}</TableCell>
                    <TableCell align="center">
                      <img
                        src={pedido.imagen}
                        alt="Imagen del producto"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </TableCell>
                    <TableCell align="right">{pedido.cantidad}</TableCell>
                    <TableCell align="right">{pedido.total}</TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title={`Calle: ${pedido.direccion}, Colonia: ${pedido.colonia}, Ciudad: ${pedido.ciudad}, CP: ${pedido.cp}, Estado: ${pedido.estado}, Teléfono: ${pedido.telefono}, Destinatario: ${pedido.nombreEnvio}`}
                        arrow
                      >
                        <Button variant="contained">Dirección</Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: (() => {
                          switch (pedido.estatusEnv) {
                            case "Preparando":
                              return "#FFA500";
                            case "En camino":
                              return "#0000FF";
                            case "Enviado":
                              return "#FFD700";
                            case "Entregado":
                              return "#008000";
                            default:
                              return "inherit";
                          }
                        })(),
                        fontWeight: "bold",
                      }}
                    >
                      {pedido.estatusEnv}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleActualizarEstatus(pedido.id)}
                        disabled={botonesDeshabilitados[pedido.id]}
                      >
                        Actualizar Estatus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="body1" color="error">
                      No se encontraron pedidos.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <tfoot>
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', padding: 2 }}>
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
