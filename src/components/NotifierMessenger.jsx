import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const NotifierMessenger = () => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [msgSnack, setMsgSnack] = useState('Todo va bien!?!?');

  useEffect(() => {
    const listener = function (request) {
      switch (request.type) {
        case 'LOGIN_ERROR':
          setMsgSnack(request.payload);
          setSnackOpen(true);
          break;
        case 'SHOW_MESSAGE_ERROR':
          setMsgSnack(request.payload);
          setSnackOpen(true);
          break;
        default:
          break;
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  const handleClose = () => {
    setSnackOpen(false);
  };

  return (
    <Snackbar autoHideDuration={6000} open={snackOpen} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
        {msgSnack}
      </Alert>
    </Snackbar>
  );
};

export default NotifierMessenger;