import store from '../../store';
import { wrapStore, sanitizeState } from '../../store/chromeRedux';
import loginAction from '../../actions/loginAction';
import logoutAction, { endTimeToLogout, forceLogoutAction } from '../../actions/logoutAction';
import { loadUserAction, removeUserAction } from '../../actions/userStorageAction';
import { hideSplash } from '../../actions/splashAction';
import { nextTheme, restoreLastTheme } from '../../actions/themeAction';
import { closeDialogUsers, openDialogUsers } from '../../actions/dialogUsersAction';
import { loadSessionFromStorage } from '../../actions/storeSessionAction';
import { closeDialogAbout, openDialogAbout } from '../../actions/dialogAboutAction';
import { detectNavigatorAction } from '../../actions/detectNavigatorAction';
import {
  closeDialogQualified,
  loadCountConnect,
  loadQualifiedState,
  openDialogQualified,
  qualifiedAccepted,
} from '../../actions/connectQualifiedAction';
import {
  closeDialogTimer,
  openDialogTimer,
  startTimerDisconnect,
  stopTimerDisconnect,
  AUTO_DISCONNECT_ALARM,
} from '../../actions/dialogTimerAction';
import {
  allowSleepConnected,
  preventSleepConnected,
  restorePreventSleepConnected,
} from '../../actions/connectedAction';
import {
  disableWarnings,
  enableWarnings,
  restoreDisableWarning,
} from '../../actions/notificationAction';
import { autoProxy } from '../../actions/proxyAutoAction';
import { enableProxy } from '../../actions/proxyEnableAction';
import { disableProxy } from '../../actions/proxyDisableAction';
import { MONTHLY_UPDATE_ALARM } from '../../actions/loginAction';
import { storageGet, storageSet } from '../../utils/chrome';

const PORT_NAME = 'nauta-connect';

// Wrap the store so the extension pages can dispatch actions and read the state.
wrapStore(store, { portName: PORT_NAME });

/**
 * The extension pages do not share the memory of the service worker, so every
 * change of the state is written to `chrome.storage.local`. The pages pick the
 * new state up through `chrome.storage.onChanged`.
 * Without this the popup would never reflect the state of the extension.
 */
let persistState = true;
store.subscribe(() => {
  if (!persistState) return;
  chrome.storage.local.set({
    [PORT_NAME + '-state']: sanitizeState(store.getState()),
  });
});

/**
 * Applies the proxy settings while the user is connected.
 * The proxy is enabled automatically when the connection is established and the
 * automatic mode is active, and it is always disabled on disconnection.
 */
let lastConnectionStatus = store.getState().login.status;
store.subscribe(() => {
  const state = store.getState();
  const status = state.login.status;
  if (status === lastConnectionStatus) return;
  lastConnectionStatus = status;

  if (status === 'connected') {
    if (state.proxy.automatic) store.dispatch(enableProxy());
  } else if (state.proxy.active) {
    store.dispatch(disableProxy());
  }
});

/**
 * Restores the state persisted by the previous run of the service worker.
 * The Manifest V3 service worker is stopped when idle, so every restart has to
 * rebuild the store from `chrome.storage.local`.
 */
const hydrateStore = async () => {
  try {
    const stored = await storageGet([PORT_NAME + '-state']);
    const state = stored[PORT_NAME + '-state'];
    if (state) {
      // The restored state is written back with the values coming from the
      // store, so the pages always receive a consistent state.
      persistState = false;
      store.dispatch({ type: 'HYDRATE_STATE', payload: state });
      persistState = true;
    }
  } catch (error) {
    console.error('Unable to restore the state', error);
  }
};

/**
 * Keeps the "prevent sleep" feature working in Manifest V3.
 * The old implementation played a muted video in the background page, which is
 * not possible anymore: the playback is delegated to an offscreen document.
 */
const setPreventSleep = async (enabled) => {
  // The offscreen document listens to this value, so it works no matter when
  // the document is created.
  await storageSet({ preventSleepConnected: enabled });

  if (!chrome.offscreen) return;
  try {
    const hasDocument = await chrome.offscreen.hasDocument();
    if (enabled) {
      if (!hasDocument) {
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: ['AUDIO_PLAYBACK'],
          justification:
            'Keeps the operating system awake while the user is connected to the Nauta network.',
        });
      }
    } else if (hasDocument) {
      await chrome.offscreen.closeDocument();
    }
  } catch (error) {
    console.error('Unable to update the offscreen document', error);
  }
};

// Initial setup: the state is restored first, so the actions below work with
// the values of the previous session.
hydrateStore().then(() => {
  restoreLastTheme();
  detectNavigatorAction();
  loadCountConnect();
  loadQualifiedState();
  restorePreventSleepConnected();
  restoreDisableWarning();

  const state = store.getState();
  if (state.configs.preventSleepConnected && state.login.status === 'connected') {
    setPreventSleep(true);
  }
});

// Message listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'LOGIN':
      loginAction(
        request.payload.username,
        request.payload.password,
        request.payload.remember
      );
      break;
    case 'LOGOUT':
      logoutAction();
      break;
    case 'FORCE_LOGOUT':
      forceLogoutAction();
      break;
    case 'LOAD_USER_STORE':
      loadUserAction(request.payload.username);
      break;
    case 'REMOVE_USER_STORE':
      removeUserAction(request.payload.username);
      break;
    case 'HIDE_SPLASH':
      hideSplash();
      break;
    case 'NEXT_THEME':
      nextTheme();
      break;
    case 'OPEN_DIALOG_USERS':
      openDialogUsers();
      break;
    case 'CLOSE_DIALOG_USERS':
      closeDialogUsers();
      break;
    case 'OPEN_DIALOG_ABOUT':
      openDialogAbout();
      break;
    case 'CLOSE_DIALOG_ABOUT':
      closeDialogAbout();
      break;
    case 'OPEN_DIALOG_QUALIFIED':
      openDialogQualified();
      break;
    case 'CLOSE_DIALOG_QUALIFIED':
      closeDialogQualified();
      break;
    case 'OPEN_DIALOG_TIMER':
      openDialogTimer();
      break;
    case 'CLOSE_DIALOG_TIMER':
      closeDialogTimer();
      break;
    case 'START_TIMER_DISCONNECT':
      if (request.payload) startTimerDisconnect(request.payload);
      break;
    case 'STOP_TIMER_DISCONNECT':
      stopTimerDisconnect();
      break;
    case 'QUALIFIED_ACCEPTED':
      qualifiedAccepted();
      break;
    case 'LOAD_SESSION_FROM_STORAGE':
      loadSessionFromStorage();
      break;
    case 'PREVENT_SLEEP_CONNECTED':
      preventSleepConnected();
      setPreventSleep(true);
      break;
    case 'ALLOW_SLEEP_CONNECTED':
      allowSleepConnected();
      setPreventSleep(false);
      break;
    case 'DISABLE_WARNINGS':
      disableWarnings();
      break;
    case 'ENABLE_WARNINGS':
      enableWarnings();
      break;
    case 'END_TIME_TO_LOGOUT':
      endTimeToLogout();
      break;
    case 'AUTO_ENABLE_PROXY':
      autoProxy(true);
      break;
    case 'MANUAL_ENABLE_PROXY':
      autoProxy(false);
      break;
    case 'ENABLE_PROXY':
      enableProxy();
      break;
    case 'DISABLE_PROXY':
      disableProxy();
      break;
    default:
      break;
  }
  sendResponse({});
  return true;
});

// Alarms keep working when the service worker is stopped.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === AUTO_DISCONNECT_ALARM) {
    store.dispatch(logoutAction());
    store.dispatch(stopTimerDisconnect());
  }
  if (alarm.name === MONTHLY_UPDATE_ALARM) {
    store.dispatch({ type: 'UPDATE_TIME_BEGIN' });
  }
});
