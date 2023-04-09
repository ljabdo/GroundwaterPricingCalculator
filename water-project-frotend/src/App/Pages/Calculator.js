import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { WaterForm } from "../Components/WaterForm";
import { SideNav } from "../Components/SideNav"
import AppBar from "../Components/AppBar"
import CssBaseline from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { color } from '@mui/system';


export const Calculator = () => {
    return(
        <Paper sx = {{backgroundColor: "#FCFFFC",
            width: 1,
            height: 1}}>
            <Box>
                <AppBar></AppBar>
                <Grid container spacing = {{xs: 0, sm: 2, xd: 5}}>
                    <Grid item xs ={2} p ={0}>
                        {/* <SideNav></SideNav> */}
                        {/* <h1>Groundwater Calculator</h1>
                        <h3>
                            Please provide vineyard statistics to help use
                            guage your water pricing.
                        </h3> */}
                    </Grid>
                    <Grid item xs = {8}>
                        <WaterForm>
                        </WaterForm>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export default Calculator