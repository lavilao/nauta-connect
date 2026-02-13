import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Skeleton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 15,
  },
  actions: {
    alignSelf: 'center',
  },
  inputSkeleton: {
    height: 40,
    width: '100%',
    marginTop: 8,
  },
}));

const Identity = ({ ...props }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [id, setId] = useState('');
  const [timeCheck, setTimeCheck] = useState('');
  const [client, setClient] = useState('');

  useEffect(() => {
    setLoading(true);
    chrome.storage.sync.get(['identity'], (v) => {
      if (v.identity) {
        setId(v.identity.id);
        setTimeCheck(v.identity.timeCheck);
        setClient(v.identity.client);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Paper className={classes.paper} {...props}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={4} className={classes.actions}>
          <Typography align="center">IDENTIDAD DEL USUARIO</Typography>
        </Grid>
        <Grid item xs={3}>
          {loading ? (
            <Skeleton
              variant="rect"
              animation="wave"
              className={classes.inputSkeleton}
            />
          ) : (
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="ID del usuario"
              variant="outlined"
              type="number"
              value={id}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {loading ? (
            <Skeleton
              variant="rect"
              animation="wave"
              className={classes.inputSkeleton}
            />
          ) : (
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="Tiempo de chequeo"
              variant="outlined"
              type="number"
              value={timeCheck}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          {loading ? (
            <Skeleton
              variant="rect"
              animation="wave"
              className={classes.inputSkeleton}
            />
          ) : (
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="Navegador"
              variant="outlined"
              value={client}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Identity;
