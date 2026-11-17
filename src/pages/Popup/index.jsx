import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Store } from '../../store/chromeRedux';
import { Provider } from 'react-redux';
import { loginInitialState } from '../../store/reducers/login';
import Popup from './Popup';
import { configInitialState } from '../../store/reducers/configs';
import { userStorageInitial } from '../../store/reducers/userStorage';
import { timeConnectionInitialState } from '../../store/reducers/timerConnection';
import { proxyInitialState } from '../../store/reducers/proxy';

const proxyStore = new Store({
  state: {
    login: loginInitialState,
    configs: configInitialState,
    userStorage: userStorageInitial,
    timerConnection: timeConnectionInitialState,
    proxy: proxyInitialState,
  },
  portName: 'nauta-connect',
});

const App = () => {
  return (
    <Provider store={proxyStore}>
      <Popup />
    </Provider>
  );
};

const container = window.document.querySelector('#app-container');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
