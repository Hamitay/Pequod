import React, { Fragment } from 'react';
import ContainerItem from '../ContainerItem';

import List from '@material-ui/core/List';

const ContainerList = ({ containers }) => {
  return (
    <Fragment>
      <List>
        {containers.map((container) => (
          <ContainerItem container={container} />
        ))}
      </List>
    </Fragment>
  );
};

export default ContainerList;
