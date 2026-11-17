import React from 'react';
import Grid from '@mui/material/Grid';
import Description from './description';
import Identity from './identity';
import Request from './request';
import Activate from './activate';

const Content = () => {
  return (
    <React.Fragment>
      <Description />
      <Identity />

      <Grid container spacing={2}>
        <Grid size={{ xs: 7 }}>
          <Request />
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Activate />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Content;