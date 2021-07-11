import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';

import ContainerState from '../ContainerState';
import styled from 'styled-components';

const StyledCard = styled(Card)``;

const ID_PREFIX_SIZE = 10;

const ContainerItem = ({ container }) => {
  const extractIdPrefix = (id) => id.substring(0, ID_PREFIX_SIZE);

  return (
    <StyledCard>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>Name: {container.name}</Typography>
            <Typography>id: {extractIdPrefix(container.id)}</Typography>
            <Typography>Image: {container.image}</Typography>
          </Grid>
          <Grid item>
            <Box mr={3}>
              <ContainerState state={container.state} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button>Restart Container</Button>
      </CardActions>
    </StyledCard>
  );
};

export default ContainerItem;
