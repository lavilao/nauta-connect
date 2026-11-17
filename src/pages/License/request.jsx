import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const Request = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ padding: theme.spacing(2), marginBottom: 15 }}>
      <Typography align="center">Solicitar licencia</Typography>
    </Paper>
  );
};

export default Request;