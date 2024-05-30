import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

function Nosotros() {
  return (
    <Container sx={{ backgroundColor: "#f8f9fa", py: 10 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h3" textAlign="center" sx={{ fontStyle: 'italic' }}>
              Conócenos.
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ maxWidth: 800 }}>
              En Daisy's Garden, pensamos en todo para convertir cualquier momento en algo mágico. Te ayudamos a expresar emociones y sentimientos a través de una gran variedad de hermosos arreglos florales, arreglos frutales y más obsequios de excelente calidad para toda ocasión a un precio justo. Queremos que nuestras flores te ayuden a crear más y mejores experiencias memorables a lo largo de tu vida, así como estar para ti en esos momentos difíciles de despedir a un ser amado y honrarlo adecuadamente.
            </Typography>
            <Typography variant="h4" textAlign="center">
              Misión.
            </Typography>
            <Typography variant="body1" textAlign="center">
              Brindar las mejores flores y 100% frescas para que tu arreglo luzca en perfectas condiciones de acuerdo a la ocasión.
            </Typography>
            <Typography variant="h4" textAlign="center">
              Valores.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1" display="flex" alignItems="center">
                <Box sx={{ mr: 1 }}>
                  <CheckIcon fontSize="medium" sx={{ color: '#C81987' }} />
                </Box>
                <span>Excelencia. Tendrás flores frescas y de máxima calidad en cada uno de los arreglos que ofrecemos en Daisy’s Garden.</span>
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center">
                <Box sx={{ mr: 1 }}>
                  <CheckIcon fontSize="medium" sx={{ color: '#C81987' }} />
                </Box>
                <span>Confiabilidad. Ten la certeza de que tu arreglo floral a domicilio, llegará en perfectas condiciones.</span>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1" display="flex" alignItems="center">
                <Box sx={{ mr: 1 }}>
                  <CheckIcon fontSize="medium" sx={{ color: '#C81987' }} />
                </Box>
                <span>Puntualidad. Ten por seguro que ese arreglo tan especial que creamos para ti, llegará en el horario acordado.</span>
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center">
                <Box sx={{ mr: 1 }}>
                  <CheckIcon fontSize="medium" sx={{ color: '#C81987' }} />
                </Box>
                <span>Compromiso. Mantener la calidad de nuestras flores en cada uno de nuestros arreglos.</span>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Nosotros;
