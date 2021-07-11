import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';

const StyledIcon = styled(CheckCircleIcon)`
  color: green;
`;

const capitalizeState = (state) => {
  return state[0].toUpperCase() + state.substring(1);
};

const ContainerState = ({ state }) => {
  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <StyledIcon fontSize={'large'} />
        </Grid>
        <Grid item>
          <Typography>{capitalizeState(state)}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ContainerState;
