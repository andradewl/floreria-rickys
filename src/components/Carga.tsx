import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../assets/logo.png'


function Carga() {
    return (
    <>
        <Grid sx={{width:'100%', height:'100vh' }}>
            <Grid sx={{
                width:'100%',
                height:'100%',
                textAlign:' center',
                alignContent: 'center'
            }}>
                    <Grid >
                        <img src={logo} alt="" style={{width:'200px', height:'100px'}}/>
                    </Grid>
                <CircularProgress />
            </Grid>
        </Grid>
    </>
    );
}
export default Carga;