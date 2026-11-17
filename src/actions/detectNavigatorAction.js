export const detectNavigatorAction = () => {
  return (dispatch) => {
    const userAgent =
      typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : '';
    const isOpera = / OPR\//.test(userAgent);
    const isFirefox = /Firefox\//.test(userAgent);
    const isChrome = /Chrome\//.test(userAgent) || /Chromium\//.test(userAgent);

    let browser = 'unknown';
    if (isFirefox) browser = 'firefox';
    else if (isOpera) browser = 'opera';
    else if (isChrome) browser = 'chrome';

    dispatch({
      type: 'NAVIGATOR_RECOGNIZED',
      payload: browser,
    });
  };
};

export default detectNavigatorAction;