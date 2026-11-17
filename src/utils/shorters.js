import { notify, delayedNotify, openExternalUrl } from './chrome';

export const clog = (message, ...optionalParams) => {
  if (process.env.NODE_ENV === 'development') console.log(message, ...optionalParams);
};

/**
 * Opens an URL in a new browser tab.
 * `window.open` is not available in the Manifest V3 service worker, so every
 * navigation is done through the chrome.tabs API.
 */
export const openInNewTab = (url) => openExternalUrl(url);

export const msToHMMSS = (time) => {
  const totalSeconds = Math.max(0, Math.floor(time / 1000));
  const cantHoras = Math.floor(totalSeconds / 3600);
  const restHoras = totalSeconds % 3600;
  const cantMinut = Math.floor(restHoras / 60);
  const cantSegun = restHoras % 60;
  const pad = (value) => value.toString().padStart(2, '0');
  return `${pad(cantHoras)}:${pad(cantMinut)}:${pad(cantSegun)}`;
};

export const basicNotification = (message, notificationId) =>
  notify(message, notificationId ? { id: notificationId } : {});

export const delayedNotification = (message, delay = 5000, notificationId) =>
  delayedNotify(message, delay, notificationId ? { id: notificationId } : {});