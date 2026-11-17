import { storageGet } from '../utils/chrome';

export const preventSleepConnected = () => {
  return (dispatch) => {
    dispatch({ type: 'PREVENT_SLEEP_CONNECTED' });
  };
};

export const allowSleepConnected = () => {
  return (dispatch) => {
    dispatch({ type: 'ALLOW_SLEEP_CONNECTED' });
  };
};

export const restorePreventSleepConnected = () => {
  return (dispatch) => {
    storageGet('preventSleepConnected').then((e) => {
      if (e.preventSleepConnected) dispatch(preventSleepConnected());
      else dispatch(allowSleepConnected());
    });
  };
};
