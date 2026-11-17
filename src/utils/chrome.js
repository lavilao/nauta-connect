/**
 * Small promise-based wrappers over the chrome.* callback APIs.
 * Every chrome.* call in the codebase goes through these helpers so that the
 * Manifest V3 promise APIs are used consistently and errors are never swallowed.
 */

const lastError = (context) => {
  const error = chrome.runtime.lastError;
  if (error) {
    console.error(`[${context}]`, error.message);
    return error;
  }
  return null;
};

/* ------------------------------ chrome.storage ----------------------------- */

export const storageGet = async (keys, area = 'local') => {
  try {
    return await chrome.storage[area].get(keys);
  } catch (error) {
    console.error(`storage.${area}.get failed`, error);
    return {};
  }
};

export const storageSet = async (items, area = 'local') => {
  try {
    await chrome.storage[area].set(items);
    return true;
  } catch (error) {
    console.error(`storage.${area}.set failed`, error);
    return false;
  }
};

export const storageRemove = async (keys, area = 'local') => {
  try {
    await chrome.storage[area].remove(keys);
    return true;
  } catch (error) {
    console.error(`storage.${area}.remove failed`, error);
    return false;
  }
};

/* ---------------------------- chrome.notifications --------------------------- */

export const notify = (message, { id, title = 'Nauta Connect', iconUrl = 'icon-128.png' } = {}) => {
  const notificationId = id || Math.random().toString().slice(2);
  const options = { type: 'basic', iconUrl, title, message };
  chrome.notifications.create(notificationId, options, () => lastError('notifications.create'));
  return notificationId;
};

export const delayedNotify = (message, delay = 5000, options = {}) => {
  setTimeout(() => notify(message, options), delay);
};

/* -------------------------------- chrome.tabs ------------------------------ */

const extensionUrl = (path) => chrome.runtime.getURL(path);

/**
 * Opens an extension page in a new tab. Popup windows cannot use window.open,
 * so every in-extension navigation goes through chrome.tabs.create.
 */
export const openExtensionPage = async (path) => {
  const url = extensionUrl(path);
  try {
    await chrome.tabs.create({ url });
  } catch (error) {
    console.error('tabs.create failed', error);
  }
};

export const openExternalUrl = async (url) => {
  try {
    await chrome.tabs.create({ url });
  } catch (error) {
    console.error('tabs.create failed', error);
  }
};