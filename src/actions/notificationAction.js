import { storageGet } from '../utils/chrome';

export const disableWarnings = () => {
  return (dispatch) => {
    dispatch({ type: 'DISABLE_WARNINGS' });
  };
};

export const enableWarnings = () => {
  return (dispatch) => {
    dispatch({ type: 'ENABLE_WARNINGS' });
  };
};

export const restoreDisableWarning = () => {
  return (dispatch) => {
    storageGet('disableWarnings').then((e) => {
      if (e.disableWarnings) dispatch(disableWarnings());
      else dispatch(enableWarnings());
    });
  };
};
