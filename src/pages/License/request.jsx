import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: 15,
  },
}));

const Request = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} {...props}>
      <Typography align="center">Solicitar licencia</Typography>
    </Paper>
  );
};

export default Request;
