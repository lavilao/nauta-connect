const loggerMiddleware = (_store) => (next) => (action) => {
  const { type, payload } = action;
  if (process.env.NODE_ENV === 'development') {
    console.info('dispatching', type, payload);
  }
  return next(action);
};

export default loggerMiddleware;