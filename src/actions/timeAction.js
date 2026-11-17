import fetchCustom from '../utils/fetch';
import { saveSessionInStorage } from './storeSessionAction';
import dayjs from 'dayjs';
import { basicNotification } from '../utils/shorters';
import { ETECSA_BASE_URL } from '../config';

const updateTimeLeftAction = (reintentos = 0) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: 'UPDATE_TIME_BEGIN' });
    const bodyData = {
      op: 'getLeftTime',
      username: state.login.username,
      ATTRIBUTE_UUID: state.login.ATTRIBUTE_UUID,
      CSRFHW: state.login.CSRFHW,
      wlanuserip: state.login.wlanuserip,
      loggerId: state.login.loggerId,
    };
    fetchCustom(`${ETECSA_BASE_URL}//EtecsaQueryServlet`, bodyData)
      .then((value) => value.text())
      .then((value) => {
        if (value.includes('errorop')) throw new Error('Error de operacion.');
        const lastUpdateTime = dayjs().toISOString();
        basicNotification(`Su tiempo restante de navegación es de ${value}.`);
        dispatch({ type: 'UPDATE_TIME_SUCCESS', payload: { lastTimeLeft: value, lastUpdateTime } });
        dispatch(saveSessionInStorage({ lastTimeLeft: value, lastUpdateTime }));
      })
      .catch(() => {
        dispatch({ type: 'UPDATE_TIME_FAILURE' });
        if (reintentos < 2) dispatch(updateTimeLeftAction(++reintentos));
      });
  };
};

export default updateTimeLeftAction;