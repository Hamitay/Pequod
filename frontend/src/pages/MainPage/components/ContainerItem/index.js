import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import ContainerState from '../ContainerState';
import styled from 'styled-components';
import axios from 'axios';

const StyledCard = styled(Card)`
  @media only screen and (min-width: 600px) {

  }
`;

const ID_PREFIX_SIZE = 10;

const ContainerItem = ({ container }) => {
  const [isLoading, setIsLoading] = useState(false)

  const extractIdPrefix = (id) => id.substring(0, ID_PREFIX_SIZE);
  const limitString = (str) => str.replace(/(.*\/)|(:.*)/g, "");

  const restartContainer = (containerId) => () => {
    setIsLoading(true)
    axios.post(`http://pequod.hamitay.com/containers/restart/${containerId}`).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <StyledCard>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={9}>
            <Typography>Name: {container.name}</Typography>
            <Typography>idPrefix: {extractIdPrefix(container.id)}</Typography>
            <Typography>Image: {limitString(container.image)}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box mr={3}>
              <ContainerState state={container.state} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button disabled={isLoading} onClick={restartContainer(container.id)}>Restart Container</Button>
      </CardActions>
    </StyledCard>
  );
};

export default ContainerItem;
