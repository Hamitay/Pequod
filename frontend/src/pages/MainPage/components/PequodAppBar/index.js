import React from 'react';
import { AppBar, Box, Grid, Typography } from '@material-ui/core';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';

const TITLE = "Pequod"

export const PequodAppBar = () => (
  <AppBar position="static">
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <Box m={1}>
        <DirectionsBoatIcon />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant='h6'>{TITLE}</Typography>
      </Grid>
    </Grid>
  </AppBar>
);

export default PequodAppBar;
