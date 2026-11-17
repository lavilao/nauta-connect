export const byPass = (host, byPassList) => {
  for (let i = 0; i < byPassList.length; i++) {
    let byPass = byPassList[i];
    if (byPass.charAt(0) === '*') {
      byPass = byPass.substring(1);
    }
    if (host.endsWith(byPass)) return true;
  }
  return false;
};

/**
 * Builds the `chrome.proxy.settings` value for a fixed HTTPS proxy.
 * @param host proxy host
 * @param port proxy port
 * @param byPassList hosts that must not go through the proxy
 */
export const buildFixedServersConfig = (host, port = 443, byPassList = []) => ({
  mode: 'fixed_servers',
  rules: {
    singleProxy: { scheme: 'https', host, port },
    bypassList: byPassList,
  },
});

export const firefoxProxyErrorListener = (error) => {
  console.error('Proxy error');
  console.error(error);
};