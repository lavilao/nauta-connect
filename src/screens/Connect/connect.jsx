import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import useStyles from '../useStyles';
import { formatTime } from '../../utils/timeUtil';
import ButtonCustom from '../../components/ButtonCustom';
import CancelIcon from '@mui/icons-material/Cancel';
import Container from '@mui/material/Container';
import './anims.css';
import ReplyIcon from '@mui/icons-material/Reply';

const Connect = ({ login }) => {
  const [time, setTime] = useState('--:--:--');
  const [showForce, setShowForce] = useState(false);
  const [restante, setRestante] = useState(login.lastTimeLeft);
  const classes = useStyles();

  const logout = () => {
    chrome.runtime.sendMessage({ type: 'LOGOUT' });
    setTimeout(() => {
      setShowForce(true);
    }, 6 * 1000);
    setTimeout(() => {
      setShowForce(false);
    }, 25 * 1000);
  };

  const forceLogout = () => {
    chrome.runtime.sendMessage({ type: 'FORCE_LOGOUT' });
  };

  const endTimeToLogout = () => {
    chrome.runtime.sendMessage({ type: 'END_TIME_TO_LOGOUT' });
  };

  const tiempoConectado = () => {
    const ms = dayjs().diff(dayjs(login.lastUpdateTime));
    setTime(formatTime(ms));
    if (login.lastTimeLeft) {
      const trestante = login.lastTimeLeft.split(':');
      const milTRestante =
        parseInt(trestante[0]) * 60 * 60 * 1000 +
        parseInt(trestante[1]) * 60 * 1000 +
        parseInt(trestante[2]) * 1000;
      if (milTRestante - ms <= 0) endTimeToLogout();
      setRestante(formatTime(milTRestante - ms));
    }
  };

  useEffect(() => {
    const interval = setInterval(tiempoConectado, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.lastUpdateTime, login.lastTimeLeft]);

  return (
    <Container className="containerConnect">
      <Typography>Usted se encuentra conectado</Typography>
      <Typography>{login.username ? login.username : '@nauta'}</Typography>
      <Divider />
      <Typography>{time === '--:--:--' ? 'Tiempo inicial:' : 'Tiempo restante:'}</Typography>
      <Typography>{restante ? restante : '--:--:--'}</Typography>
      <Typography>Tiempo conectado:</Typography>
      <Typography>{time}</Typography>

      <div className={classes.buttonsContainer}>
        <ButtonCustom
          color="inherit"
          onClick={logout}
          style={{ backgroundColor: 'white', color: '#3f51b5' }}
          startIcon={<CancelIcon />}
        >
          DESCONECTARSE
        </ButtonCustom>
        {showForce ? (
          <ButtonCustom
            fullWidth={false}
            color="inherit"
            onClick={forceLogout}
            style={{
              backgroundColor: 'white',
              color: '#3f51b5',
              position: 'absolute',
              right: 10,
              bottom: 25,
            }}
            startIcon={<ReplyIcon />}
          >
            Forzar
          </ButtonCustom>
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(Connect);