const DEFAULT_PORT_NAME = 'redux-store';

export function wrapStore(store, { portName = DEFAULT_PORT_NAME } = {}) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === `${portName}-getState`) {
      sendResponse({ state: store.getState() });
      return true;
    }
    if (message.type === `${portName}-dispatch`) {
      store.dispatch(message.action);
      sendResponse({ success: true });
      return true;
    }
    if (message.type === `${portName}-subscribe`) {
      const unsubscribe = store.subscribe(() => {
        chrome.storage.local.set({ [portName + '-state']: store.getState() });
      });
      chrome.storage.local.set({ [portName + '-state']: store.getState() });
      sendResponse({ success: true });
      return true;
    }
  });
}

export class Store {
  constructor({ portName = DEFAULT_PORT_NAME, state = {} } = {}) {
    this.portName = portName;
    this._state = state;
    this._listeners = [];

    chrome.storage.local.get([portName + '-state'], (result) => {
      if (result[portName + '-state']) {
        this._state = result[portName + '-state'];
        this._listeners.forEach((l) => l());
      }
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes[portName + '-state']) {
        this._state = changes[portName + '-state'].newValue;
        this._listeners.forEach((l) => l());
      }
    });
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    chrome.runtime.sendMessage({ type: `${this.portName}-dispatch`, action });
    return action;
  }

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  replaceReducer() {}
}
