import { storageGet, storageSet } from '../../utils/chrome';

const identityGenerator = (_store) => (next) => (action) => {
  const { type, payload } = action;
  if (type === 'NAVIGATOR_RECOGNIZED') {
    storageGet(['identity'], 'sync').then((val) => {
      if (!val.identity) {
        const identity = {
          id: parseInt((Math.random() * 10000000000000000).toString()),
          timeCheck: Date.now(),
          client: payload,
        };
        storageSet({ identity }, 'sync');
      }
    });
  }
  return next(action);
};

export default identityGenerator;