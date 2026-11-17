import { openInNewTab } from '../../utils/shorters';
import { storageSet } from '../../utils/chrome';

export const configInitialState = {
  theme: 'auto', // 'auto' || 'dark' || 'light'
  animSplashInit: true,
  animSplashDisconnect: false,
  openDialogUsers: false,
  navigator: 'chrome', // 'chrome' || 'firefox' || 'opera' || 'unknown'
  urlShared: 'https://chromewebstore.google.com/detail/nauta-connect/ppopcmgfgajciikdmipmmpffkpccinep',
  openDialogAbout: false,
  countConnect: 0,
  qualified: false,
  openDialogQualified: false,
  preventSleepConnected: false,
  disableWarnings: false,
};

export const urlsSharedNavigator = {
  chrome: 'https://chromewebstore.google.com/detail/nauta-connect/ppopcmgfgajciikdmipmmpffkpccinep',
  firefox: 'https://addons.mozilla.org/es/firefox/addon/nauta-connect/',
};

const configs = (state = configInitialState, { type, payload }) => {
  switch (type) {
    case 'HIDE_SPLASH':
      return { ...state, animSplashInit: false };
    case 'DISCONNECT_SPLASH':
      return { ...state, animSplashInit: true };
    case 'DISCONNECT_SPLASH_END':
      return { ...state, animSplashInit: false };
    case 'NEXT_THEME': {
      const nextTheme =
        state.theme === 'auto' ? 'dark' : state.theme === 'dark' ? 'light' : 'auto';
      storageSet({ theme: nextTheme });
      return { ...state, theme: nextTheme };
    }
    case 'SET_THEME':
      return { ...state, theme: payload };
    case 'OPEN_DIALOG_USERS':
      return { ...state, openDialogUsers: true };
    case 'CLOSE_DIALOG_USERS':
      return { ...state, openDialogUsers: false };
    case 'OPEN_DIALOG_ABOUT':
      return { ...state, openDialogAbout: true };
    case 'CLOSE_DIALOG_ABOUT':
      return { ...state, openDialogAbout: false };
    case 'OPEN_DIALOG_QUALIFIED':
      return { ...state, openDialogQualified: true };
    case 'CLOSE_DIALOG_QUALIFIED':
      return { ...state, openDialogQualified: false };
    case 'QUALIFIED_ACCEPTED':
      openInNewTab(state.urlShared);
      storageSet({ qualified: true });
      return { ...state, qualified: true };
    case 'NAVIGATOR_RECOGNIZED': {
      const url = urlsSharedNavigator[payload] || urlsSharedNavigator.chrome;
      return { ...state, navigator: payload, urlShared: url };
    }
    case 'SET_COUNT_CONNECT':
      return { ...state, countConnect: payload };
    case 'SET_QUALIFIED':
      return { ...state, qualified: payload };
    case 'LOGIN_SUCCESS': {
      const countConnect = state.countConnect + 1;
      storageSet({ countConnect });
      if (!state.qualified && countConnect !== 0 && countConnect % 50 === 0)
        return { ...state, countConnect, openDialogQualified: true };
      return { ...state, countConnect };
    }
    case 'PREVENT_SLEEP_CONNECTED':
      storageSet({ preventSleepConnected: true });
      return { ...state, preventSleepConnected: true };
    case 'ALLOW_SLEEP_CONNECTED':
      storageSet({ preventSleepConnected: false });
      return { ...state, preventSleepConnected: false };
    case 'DISABLE_WARNINGS':
      storageSet({ disableWarnings: true });
      return { ...state, disableWarnings: true };
    case 'ENABLE_WARNINGS':
      storageSet({ disableWarnings: false });
      return { ...state, disableWarnings: false };
    default:
      return state;
  }
};

export default configs;