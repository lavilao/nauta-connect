import { checkAndTaskNextUpdate } from './loginAction';
import { basicNotification } from '../utils/shorters';
import { storageGet, storageRemove, storageSet } from '../utils/chrome';

export const saveSessionInStorage = (session) => {
  return (dispatch) => {
    storageSet(session).then(() => {
      dispatch({ type: 'SAVED_SESSION_IN_STORAGE' });
    });
  };
};

export const clearSessionInStorage = () => {
  return (dispatch) => {
    storageRemove([
      'username',
      'ATTRIBUTE_UUID',
      'CSRFHW',
      'wlanuserip',
      'loggerId',
      'lastUpdateTime',
      'lastTimeLeft',
    ]).then(() => {
      dispatch({ type: 'REMOVED_SESSION_IN_STORAGE' });
    });
  };
};

export const loadSessionFromStorage = () => {
  return (dispatch) => {
    storageGet([
      'username',
      'ATTRIBUTE_UUID',
      'CSRFHW',
      'wlanuserip',
      'loggerId',
      'lastUpdateTime',
      'lastTimeLeft',
    ]).then((sc) => {
      if (
        sc.username &&
        sc.ATTRIBUTE_UUID &&
        sc.CSRFHW &&
        sc.lastUpdateTime &&
        sc.lastTimeLeft
      ) {
        dispatch({ type: 'LOAD_SESSION_FROM_STORAGE', payload: sc });
        checkAndTaskNextUpdate(dispatch);
      } else {
        basicNotification('No se ha encontrado ninguna sesión para restablecer.');
      }
    });
  };
};