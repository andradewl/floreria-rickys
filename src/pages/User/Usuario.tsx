import React, { useState } from "react";
import { Typography, Grid, Tabs, Tab, Paper } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import DescriptionIcon from "@mui/icons-material/Description";
import HistPedidos from "./HistPedidos";
import EstatusEnvio from "./EstatusEnvio";
import Ubicaciones from "./Ubicaciones";
import DatosFac from "./DatosFac";

const Usuario = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleChange = (_: React.ChangeEvent<object>, newValue: number) => {
    setTabValue(newValue);
  };

  const renderContent = () => {
    switch (tabValue) {
      case 0:
        return <HistPedidos />;
      case 1:
        return <EstatusEnvio />;
      case 2:
        return <Ubicaciones />;
      case 3:
        return <DatosFac />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ py: 15, px: 2 }}>
      <Grid item xs={12} md={3}>
        <Paper
          elevation={3}
          sx={{ p: 2, backgroundColor: "#F3F3F3", borderRadius: 2 }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "600",
              paddingBottom: "1%",
              fontFamily: "Cormorant",
            }}
          >
            Opciones
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            orientation="vertical"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#C81987" } }}
          >
            <Tab
              icon={
                <LocalFloristIcon fontSize="medium" sx={{ color: "#C81987" }} />
              }
              iconPosition="start"
              label="Historial de pedidos"
              sx={{
                alignSelf: "start",
                textAlign: "left",
                fontWeight: "600",
                paddingBottom: "2%",
                fontFamily: "Cormorant",
              }}
            />
            <Tab
              icon={<LoyaltyIcon fontSize="medium" sx={{ color: "#C81987" }} />}
              iconPosition="start"
              label="Estatus de envío"
              sx={{
                alignSelf: "start",
                textAlign: "left",
                fontWeight: "600",
                paddingBottom: "2%",
                fontFamily: "Cormorant",
              }}
            />
            <Tab
              icon={
                <MapsHomeWorkIcon fontSize="medium" sx={{ color: "#C81987" }} />
              }
              iconPosition="start"
              label="Ubicaciones de entrega"
              sx={{
                alignSelf: "start",
                textAlign: "left",
                fontWeight: "600",
                paddingBottom: "2%",
                fontFamily: "Cormorant",
              }}
            />
            <Tab
              icon={
                <DescriptionIcon fontSize="medium" sx={{ color: "#C81987" }} />
              }
              iconPosition="start"
              label="Datos de facturación"
              sx={{
                alignSelf: "start",
                textAlign: "left",
                fontWeight: "600",
                paddingBottom: "2%",
                fontFamily: "Cormorant",
              }}
            />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            border: "1px solid #ccc",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
            margin: "0 10px", // Agrega margen alrededor del Paper
          }}
        >
          {renderContent()}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Usuario;
