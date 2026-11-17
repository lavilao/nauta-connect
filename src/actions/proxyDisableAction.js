export const disableProxy = () => {
  return (dispatch) => {
    chrome.proxy.settings
      .clear({ scope: 'regular' })
      .then(() => {
        dispatch({ type: 'DISABLE_PROXY' });
      })
      .catch((error) => {
        console.error('Unable to disable the proxy', error);
      });
  };
};
