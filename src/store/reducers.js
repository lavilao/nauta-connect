import { combineReducers } from 'redux';
import login from './reducers/login';
import userStorage from './reducers/userStorage';
import configs from './reducers/configs';
import timerConnection from './reducers/timerConnection';
import proxy from './reducers/proxy';

// Cada vez que se agregue un nuevo reducer, se debe agregar la inicializacion en '/pages/Popup/index.jsx'
export const allReducers = {
  login,
  userStorage,
  configs,
  proxy,
  timerConnection,
};

const combinedReducer = combineReducers(allReducers);

/**
 * The Manifest V3 service worker is stopped whenever it becomes idle, so the
 * state has to be restored from `chrome.storage.local` when it starts again.
 * `HYDRATE_STATE` merges the persisted state into the current one.
 */
const rootReducer = (state, action) => {
  if (action.type === 'HYDRATE_STATE' && action.payload) {
    const hydrated = {};
    Object.keys(allReducers).forEach((key) => {
      const slice = allReducers[key];
      const current =
        state && state[key] !== undefined ? state[key] : slice(undefined, { type: '@@INIT' });
      const incoming = action.payload[key];
      hydrated[key] = incoming ? { ...current, ...incoming } : current;
    });
    return hydrated;
  }
  return combinedReducer(state, action);
};

export default rootReducer;