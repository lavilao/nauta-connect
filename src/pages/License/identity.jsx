import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { storageGet } from '../../utils/chrome';

const Identity = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [identity, setIdentity] = useState({ id: '', timeCheck: '', client: '' });

  const paperStyle = { padding: theme.spacing(2), marginBottom: 15 };
  const inputSkeleton = { height: 40, width: '100%', marginTop: 8 };

  useEffect(() => {
    let active = true;
    storageGet(['identity'], 'sync').then((v) => {
      if (!active) return;
      if (v.identity) {
        setIdentity({
          id: v.identity.id,
          timeCheck: v.identity.timeCheck,
          client: v.identity.client,
        });
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const renderField = (content) =>
    loading ? <Skeleton variant="rect" animation="wave" sx={inputSkeleton} /> : content;

  return (
    <Paper sx={paperStyle}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 4 }} sx={{ alignSelf: 'center' }}>
          <Typography align="center">IDENTIDAD DEL USUARIO</Typography>
        </Grid>
        <Grid size={{ xs: 3 }}>
          {renderField(
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="ID del usuario"
              variant="outlined"
              type="number"
              value={identity.id}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 3 }}>
          {renderField(
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="Tiempo de chequeo"
              variant="outlined"
              type="number"
              value={identity.timeCheck}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 2 }}>
          {renderField(
            <TextField
              margin="dense"
              size="small"
              fullWidth
              label="Navegador"
              variant="outlined"
              value={identity.client}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Identity;