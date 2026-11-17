import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { verifyLicense } from '../../store/middlewares/protectActions';
import { storageGet, storageRemove, storageSet } from '../../utils/chrome';

const Activate = () => {
  const theme = useTheme();

  const [checking, setChecking] = useState(false);
  const [license, setLicense] = useState('');
  const [msgLicense, setMsgLicense] = useState('Pegue aquí su licencia');

  const paperStyle = { padding: theme.spacing(2), marginBottom: 15 };
  const textAreaStyle = {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: 'smaller',
    textAlign: 'center',
  };

  const handleChangeLicense = (event) => {
    setLicense(event.target.value);
  };

  const resetMsg = (secondsTimeWait = 5) => {
    setTimeout(() => {
      setMsgLicense('Pegue aquí su licencia');
    }, secondsTimeWait * 1000);
  };

  const clearToken = () => {
    storageRemove(['token'], 'sync').then(() => {
      setLicense('');
      setMsgLicense('Pegue aquí su licencia');
    });
  };

  const checkLicense = async (event, token = license) => {
    setChecking(true);
    try {
      const { identity } = await storageGet(['identity'], 'sync');
      if (!identity) throw new Error('No identity found');

      const claims = await verifyLicense(token);
      if (
        parseInt(claims.id) !== parseInt(identity.id) ||
        parseInt(claims.timeCheck) !== parseInt(identity.timeCheck) ||
        String(claims.client).toLowerCase() !== String(identity.client).toLowerCase()
      ) {
        throw new Error('The license does not match this installation');
      }

      setMsgLicense(
        `Su licencia de Nauta Connect es válida hasta el ${new Date(
          claims.exp * 1000
        ).toLocaleString()}.`
      );
      await storageSet({ token }, 'sync');
    } catch {
      setMsgLicense('Su licencia no es válida o ya se ha vencido. Solicite una nueva licencia.');
      resetMsg();
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    storageGet(['token'], 'sync').then(({ token }) => {
      if (token) {
        setLicense(token);
        checkLicense(null, token);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={paperStyle}>
      <Typography align="center">Licencia</Typography>
      {checking ? (
        <Skeleton height={236} width="100%" variant="rect" />
      ) : (
        <TextareaAutosize
          sx={textAreaStyle}
          minRows={23}
          value={license}
          onChange={handleChangeLicense}
        />
      )}

      <Typography align="center" sx={{ height: '3em' }}>
        {msgLicense}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 8 }}>
          <Button fullWidth variant="contained" color="primary" onClick={checkLicense}>
            Activar
          </Button>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Button fullWidth variant="contained" color="inherit" onClick={clearToken}>
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Activate;