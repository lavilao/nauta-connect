import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const Description = () => {
  const theme = useTheme();
  const prices = { byMonths: 15, byYears: 120 };

  return (
    <Paper sx={{ padding: theme.spacing(2), marginBottom: 15 }}>
      <Typography>
        <b>Estimado usuario.</b>
      </Typography>
      <Typography>
        Esta extensión es parcialmente gratuita, si desea activar todas
        funcionalidades, usted debe comprar una licencia.
      </Typography>
      <Typography>
        <b>Precios:</b>
      </Typography>
      <Typography>
        Licencia mensual: <b>$ {prices.byMonths.toFixed(2)}</b> CUP por mes (1 - 11 meses)
      </Typography>
      <Typography>
        Licencia anual: <b>$ {prices.byYears.toFixed(2)}</b> CUP por año (1 - 5 años)
      </Typography>
      <Typography variant="subtitle2">
        <b>IMPORTANTE:</b> TENIENDO EN CUENTA EL INMINENTE CAMBIO DEL VALOR DEL CUP POR EL
        MOMENTO SOLO SE EMITIRÁN LICENCIAS CON DOS MESES DE DURACIÓN MAXIMO.
      </Typography>
    </Paper>
  );
};

export default Description;