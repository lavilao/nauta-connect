export const autoProxy = (auto = true) => {
  return (dispatch) => {
    if (auto) dispatch({ type: 'AUTO_ENABLE_PROXY' });
    else dispatch({ type: 'MANUAL_ENABLE_PROXY' });
  };
};
