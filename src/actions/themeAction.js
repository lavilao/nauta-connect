import { storageGet } from '../utils/chrome';

export const nextTheme = () => {
  return (dispatch) => {
    dispatch({ type: 'NEXT_THEME' });
  };
};

export const restoreLastTheme = () => {
  return (dispatch) => {
    storageGet('theme').then((e) => {
      if (e.theme) dispatch({ type: 'SET_THEME', payload: e.theme });
    });
  };
};
