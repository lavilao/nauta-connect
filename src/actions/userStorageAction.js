import CryptoJS from 'crypto-js';
import { REACT_APP_KEY_PROTECT } from '../config';
import { basicNotification } from '../utils/shorters';
import { storageGet, storageSet } from '../utils/chrome';

export const saveUserAction = (username, password) => {
  return (dispatch) => {
    const cipherPassword = CryptoJS.AES.encrypt(password, REACT_APP_KEY_PROTECT).toString();
    const callbackPre = () => {
      dispatch({ type: 'SAVE_USER_STORE', payload: { username, password } });
      basicNotification('La cuenta de usuario ha sido guardada satisfactoriamente.');
      setTimeout(() => {
        basicNotification(
          'Puede administrar las cuentas guardadas en las Opciones de "Ver Cuentas".'
        );
      }, 6500);
      dispatch(clearUserInTimeDeltaAction());
    };

    storageGet(['users'], 'sync').then(({ users }) => {
      const list = Array.isArray(users) ? [...users] : [];
      const index = list.findIndex((user) => user.username === username);
      if (index >= 0) {
        list[index] = { username, password: cipherPassword };
      } else {
        list.push({ username, password: cipherPassword });
      }
      storageSet({ users: list }, 'sync').then(callbackPre);
    });
  };
};

export const loadUserAction = (username = '') => {
  return (dispatch) => {
    storageGet(['users'], 'sync').then(({ users }) => {
      if (!Array.isArray(users)) return;
      const index = users.findIndex((user) => user.username === username);
      if (index >= 0) {
        const bytes = CryptoJS.AES.decrypt(users[index].password, REACT_APP_KEY_PROTECT);
        const password = bytes.toString(CryptoJS.enc.Utf8);
        dispatch({ type: 'LOAD_USER_STORE', payload: { username, password } });
        dispatch(clearUserInTimeDeltaAction());
      }
    });
  };
};

export const removeUserAction = (username) => {
  return (dispatch) => {
    storageGet(['users'], 'sync').then(({ users }) => {
      if (!Array.isArray(users)) return;
      const index = users.findIndex((user) => user.username === username);
      if (index >= 0) {
        const list = [...users];
        list.splice(index, 1);
        storageSet({ users: list }, 'sync').then(() => {
          dispatch({ type: 'REMOVE_USER_STORE' });
        });
      }
    });
  };
};

export const clearUserInTimeDeltaAction = (timeDelta = 1000 * 2) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_USER_STORE' });
    }, timeDelta);
  };
};