"use client"
import { createTheme } from '@mui/material/styles';
import '@fontsource/kosugi-maru';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFDE59',
        },
        secondary: {
            main: '#D9D9D9',
        },
        info: {
            main: '#332C12',
        }
    },
    typography: {
        fontFamily: "'Kosugi Maru', 'Arial', sans-serif",
    },
});

export default theme;