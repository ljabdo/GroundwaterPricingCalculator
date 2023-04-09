import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#22577A',
        },
        secondary: {
            main: '#465362',
        },
        background: {
            default: '#465362',
            paper: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    components: {
    },
});

export default theme;
