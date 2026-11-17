import { basicNotification, delayedNotification } from '../utils/shorters';
import { formatTime } from '../utils/timeUtil';

export const AUTO_DISCONNECT_ALARM = 'nauta-auto-disconnect';

export const openDialogTimer = () => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_DIALOG_TIMER' });
  };
};

export const closeDialogTimer = () => {
  return (dispatch) => {
    dispatch({ type: 'CLOSE_DIALOG_TIMER' });
  };
};

export const startTimerDisconnect = (msDuration) => {
  return (dispatch) => {
    if (!msDuration) return;

    // chrome.alarms survives the termination of the Manifest V3 service worker.
    chrome.alarms.create(AUTO_DISCONNECT_ALARM, {
      delayInMinutes: msDuration / (1000 * 60),
    });

    basicNotification(
      `Su conexión se cerrara de forma automática pasado el tiempo de ${formatTime(msDuration)}.`
    );
    delayedNotification(
      'Asegúrese de no tener ningún VPN o otra herramienta que filtre o manipule el tráfico de la red activa, de lo contrario puede que la sesión no se cierre correctamente.'
    );
    dispatch({ type: 'START_TIMER_DISCONNECT', payload: { msDuration } });
  };
};

export const stopTimerDisconnect = () => {
  return (dispatch) => {
    chrome.alarms.clear(AUTO_DISCONNECT_ALARM);
    basicNotification('Se ha cancelado la desconexión automática.');
    dispatch({ type: 'STOP_TIMER_DISCONNECT' });
  };
};
