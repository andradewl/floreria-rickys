import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette{
    BG = "#ffff",
    VIOLLETE = 'rgb(151, 15, 103)',
    // FONT_GLOBAL = 'Shippori Mincho',
}


const theme = createTheme({
    palette:{
        mode:"light",
        background:{
            default:themePalette.BG
        },
        primary:{
            main: themePalette.VIOLLETE
        }
    },
    // typography:{
    //     fontFamily:themePalette.FONT_GLOBAL
    // }
})

export const ThemeConfig: React.FC<ThemeProp> =({children})=>{
    return(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
    )
}