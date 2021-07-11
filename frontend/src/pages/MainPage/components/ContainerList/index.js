import React from 'react';
import { Box } from '@material-ui/core'
import ContainerItem from '../ContainerItem';

const ContainerList = ({ containers }) => {
  return (
    <Box>
      {containers.map((container) => (
          <Box key={container.id} m={1}>
            <ContainerItem key={container.id} container={container} />
          </Box>
        ))}
    </Box>
  );
};

export default ContainerList;
