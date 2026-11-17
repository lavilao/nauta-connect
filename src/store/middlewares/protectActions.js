import { importSPKI, jwtVerify } from 'jose';
import { PUBLIC_KEY } from '../../config';
import { storageGet } from '../../utils/chrome';
import { openExtensionPage } from '../../utils/chrome';

const listTypesProtected = [
  'OPEN_DIALOG_TIMER',
  'START_TIMER_DISCONNECT',
  'AUTO_ENABLE_PROXY',
];

let publicKeyPromise = null;

const getPublicKey = () => {
  if (!publicKeyPromise) {
    publicKeyPromise = importSPKI(PUBLIC_KEY, 'RS256');
  }
  return publicKeyPromise;
};

/**
 * Verifies the license (a RS256 signed JWT) against the public key.
 * @param {string} token license token
 * @returns {Promise<object>} the payload of the token
 */
export const verifyLicense = async (token) => {
  const publicKey = await getPublicKey();
  const { payload } = await jwtVerify(token, publicKey, { algorithms: ['RS256'] });
  return payload;
};

const protectActions = (_store) => (next) => (action) => {
  const { type } = action;

  if (!listTypesProtected.includes(type)) return next(action);

  return (async () => {
    try {
      const { token, identity } = await storageGet(['token', 'identity'], 'sync');
      if (!token || !identity) throw new Error('No license found');

      const claims = await verifyLicense(token);
      if (
        parseInt(claims.id) !== parseInt(identity.id) ||
        parseInt(claims.timeCheck) !== parseInt(identity.timeCheck) ||
        String(claims.client).toLowerCase() !== String(identity.client).toLowerCase()
      ) {
        throw new Error('The license does not match this installation');
      }
      return next(action);
    } catch (error) {
      console.warn('Protected action blocked:', error.message);
      // `window.open` is not available in the Manifest V3 service worker.
      await openExtensionPage('license.html');
      return undefined;
    }
  })();
};

export default protectActions;