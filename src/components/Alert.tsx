import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { Notificacionprops } from "../interfaces/interfaces";

export function NotificacionSuccess({ message }: Notificacionprops){
    return (
        <>
        <Snackbar open={true}>
            <Alert variant="filled" severity="success"
            sx={{
                md:{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px'
                },
                xs:{
                    position: 'fixed',
                    top: '50px',
                    right: '50px'
                }
                
            }}
            >
                <AlertTitle>
                    {message}
                </AlertTitle>
            </Alert>

        </Snackbar>
    </>
    )
}


export function NotificacionInfo( {message }: Notificacionprops){
    return (
        <>
        <Snackbar open={true}>
            <Alert variant="filled" severity="info"
            sx={{
                position: 'fixed',
                bottom: '50px',
                right: '50px'
            }}
            >
                <AlertTitle>
                {message}
                </AlertTitle>
            </Alert>

        </Snackbar>
    </>
    )
}

export function NotificacionWarning({ message }: Notificacionprops){
    return (
        <>
        <Snackbar open={true}>
            <Alert variant="filled" severity="warning"
            sx={{
                md:{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px'
                },
                xs:{
                    position: 'fixed',
                    top: '50px',
                    right: '50px'
                }
            }}
            >
                <AlertTitle>
                {message}
                </AlertTitle>
            </Alert>

        </Snackbar>
    </>
    )
}


export function Notificacionerror({ message }: Notificacionprops){
    return (
        <>
        <Snackbar open={true}>
            <Alert variant="filled" severity="error"
            sx={{
                position: 'fixed',
                bottom: '50px',
                right: '50px'
            }}
            >
                <AlertTitle>
                    {message}
                </AlertTitle>
            </Alert>

        </Snackbar>
    </>
    )
}
