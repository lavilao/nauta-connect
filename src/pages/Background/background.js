import store from '../../store';
import { wrapStore } from '../../store/chromeRedux';
import loginAction from '../../actions/loginAction';
import logoutAction, {
  endTimeToLogout,
  forceLogoutAction,
} from '../../actions/logoutAction';
import {
  loadUserAction,
  removeUserAction,
} from '../../actions/userStorageAction';
import { disconnectSplash, hideSplash } from '../../actions/splashAction';
import { nextTheme, restoreLastTheme } from '../../actions/themeAction';
import {
  closeDialogUsers,
  openDialogUsers,
} from '../../actions/dialogUsersAction';
import { loadSessionFromStorage } from '../../actions/storeSessionAction';
import {
  closeDialogAbout,
  openDialogAbout,
} from '../../actions/dialogAboutAction';
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

// Wrap the store
wrapStore(store, {
  portName: 'nauta-connect',
});

// Initial setup
restoreLastTheme();
detectNavigatorAction();
loadCountConnect();
loadQualifiedState();
restorePreventSleepConnected();
restoreDisableWarning();

// Subscribe to store changes for prevent sleep logic (video removed, log only)
store.subscribe(() => {
  const state = store.getState();
  const { login, timerConnection, configs } = state;
  if (
    (configs.preventSleepConnected || timerConnection.enabled) &&
    login.status === 'connected'
  ) {
    console.log('PREVENT SLEEP ACTIVE');
    // TODO: Implement alternative to video for preventing sleep in MV3
  } else {
    console.log('PREVENT SLEEP STOPPED');
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
      break;
    case 'ALLOW_SLEEP_CONNECTED':
      allowSleepConnected();
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
  }
  sendResponse({});
  return true;
});
