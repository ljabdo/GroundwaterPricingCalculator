import { Stack , Box , Paper, FormControl } from "@mui/material";
import {   
  Navigate,
  useNavigate
} from "react-router-dom"
import theme from "../Pages/theme"
import { ThemeProvider } from '@emotion/react';

// https://coolors.co/palette/22577a-38a3a5-57cc99-80ed99-c7f9cc

export const SideNav = () => {
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1,
                height: 1,
                bgcolor: 'primary.main',
                mt: 0,
                pt: 0
                }}>
                <h1>test</h1>
            </Box>
        </ThemeProvider>
    )
}

export default SideNav