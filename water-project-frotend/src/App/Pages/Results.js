import * as React from 'react';
import { useLocation } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from "../Components/AppBar"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function createData(name, one, two, three, four, five) {
    return { name, one, two, three, four , five};
  }

  const rows = [
    // createData(state[0], state[1], state[2], state[3], state[4])
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
 
  export function Results() {
    const { state } = useLocation();
    rows.push(createData("Usage acre/ft", 0.01, 3.00, 8.00, 14.00, 50.00))
    rows.push(createData("Price/acre", 130, 160, 205, 280, 400))
    rows.push(createData("Adjusted Price/acre", Math.ceil(state.adjustedPrices[0]), Math.ceil(state.adjustedPrices[1]), 
        Math.ceil(state.adjustedPrices[2]), Math.ceil(state.adjustedPrices[3]), Math.ceil(state.adjustedPrices[4])))

    return (
      <Box>
      <TableContainer component={Paper}>
      <AppBar></AppBar>
        <Table sx={{ minWidth: 650}} aria-label="s,imple table">
          <TableHead>
            <TableRow>
              <TableCell>Water Prices</TableCell>
            </TableRow>
          </TableHead>  
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.one}</TableCell>
                <TableCell align="right">{row.two}</TableCell>
                <TableCell align="right">{row.three}</TableCell>
                <TableCell align="right">{row.four}</TableCell>
                <TableCell align="right">{row.five}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 

      <Box sx = {{mt: 10}}>
      <Grid container spacing = {{xs: 50}} alignItems="center" justifyContent="center">
        <Grid item xs = {4}>
        <Card sx={{ width: 350, height: 75}}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              Water Cost Per Acre: ${Math.ceil(state.waterCostAcre)}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
        
        <Grid item xs = {5}>
        <Card sx={{ width: 350, height: 75}}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              Total Water Cost: ${Math.ceil(state.totalWaterCost)}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
        </Grid>
        </Box>

      </Box>
    );
  }