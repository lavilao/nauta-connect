import dataWrapper from '../utils/htmlWrapper';
import fetchCustom from '../utils/fetch';
import updateTimeLeftAction from './timeAction';
import forceUpdateAction from './forceUpdateAction';
import { saveUserAction } from './userStorageAction';
import { saveSessionInStorage } from './storeSessionAction';
import { msToNextFirstDate } from '../utils/timeUtil';
import { basicNotification, delayedNotification } from '../utils/shorters';
import Log from '../utils/log';
import { ETECSA_BASE_URL } from '../config';

export const MONTHLY_UPDATE_ALARM = 'nauta-monthly-update';

const LOGIN_ERROR_MESSAGES = [
  'Entre el nombre de usuario y contraseña correctos.',
  'No se pudo autorizar al usuario.',
  'El nombre de usuario o contraseña son incorrectos.',
];

const loginAction = (username, password, remember = false) => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({ type: 'LOGIN_BEGIN', payload: { status: 'loading', username } });
    const bodyData = { username, password };
    fetchCustom(`${ETECSA_BASE_URL}//LoginServlet`, bodyData)
      .then((value) => value.text())
      .then((value) => {
        if (LOGIN_ERROR_MESSAGES.some((message) => value.includes(message))) {
          basicNotification('El nombre de usuario o contraseña son incorrectos.');
          dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
        } else if (value.includes('El usuario ya está conectado.')) {
          basicNotification('Ya se encuentra un usuario conectado.');
          if (remember) dispatch(saveUserAction(username, password));
          dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
        } else if (value.includes('Usted ha realizado muchos intentos.')) {
          basicNotification('Usted ha realizado muchos intentos. Por favor intente más tarde.');
          dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
        } else if (value.includes('Su tarjeta no tiene saldo disponible.')) {
          basicNotification('Su cuenta no tiene saldo disponible.');
          dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
        } else if (value.includes('esta siendo usada')) {
          basicNotification('Su cuenta esta siendo usada.');
          dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
        } else {
          const resp = dataWrapper(value);
          dispatch(saveSessionInStorage(resp));
          dispatch(updateTimeLeftAction());
          dispatch({ type: 'LOGIN_SUCCESS', payload: { status: 'connected', ...resp } });
          checkAndTaskNextUpdate(dispatch);
          if (remember) dispatch(saveUserAction(username, password));
          dispatch(forceUpdateAction());
          basicNotification(
            'Usted se ha conectado satisfactoriamente, ahora puede comenzar a navegar.'
          );
        }
      })
      .catch((reason) => {
        Log.Debug('error reason >>', reason);
        basicNotification('Ha ocurrido un error con la conexión de red.');
        if (!state.configs.disableWarnings)
          delayedNotification(
            'Por favor revise su conexión de red y asegúrese de no tener ningún VPN u otra herramienta que filtre o manipule el tráfico de la red activa.'
          );
        dispatch({ type: 'LOGIN_FAILURE', payload: { status: 'error' } });
      });
  };
};

export const checkAndTaskNextUpdate = (dispatch) => {
  // The monthly refresh is handled by chrome.alarms so it is not lost when the
  // Manifest V3 service worker is stopped.
  chrome.alarms.create(MONTHLY_UPDATE_ALARM, {
    delayInMinutes: Math.max(1, msToNextFirstDate() / (1000 * 60)),
  });
  dispatch({ type: 'SET_ID_TIME_OUT_NEXT_UPDATE', payload: null });
};

export default loginAction;