import React, { Fragment } from 'react';

import { ListItem, ListItemText, Typography } from '@material-ui/core';

const ID_PREFIX_SIZE = 10;

const ContainerItem = ({ container }) => {

  const extractIdPrefix = (id) => id.substring(0, ID_PREFIX_SIZE)

  return (
    <ListItem>
      <ListItemText
        primary={`Name: ${container.name}`}
        secondary={
          <Fragment>
            <Typography>
              {extractIdPrefix(container.id)}
              <br></br>
              {container.image}
            </Typography>
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default ContainerItem;
