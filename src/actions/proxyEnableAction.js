import { buildFixedServersConfig } from '../utils/proxy';

export const enableProxy = () => {
  return (dispatch, getState) => {
    const { proxy } = getState();
    const server = proxy.serversList[proxy.currentPosProxy];
    if (!server) {
      console.error('No proxy server available');
      return;
    }

    const proxyConfig = buildFixedServersConfig(
      server.domain,
      443,
      proxy.byPassList
    );

    chrome.proxy.settings
      .set({ scope: 'regular', value: proxyConfig })
      .then(() => {
        dispatch({ type: 'ENABLE_PROXY' });
      })
      .catch((error) => {
        console.error('Unable to enable the proxy', error);
        dispatch({ type: 'DISABLE_PROXY' });
      });
  };
};
