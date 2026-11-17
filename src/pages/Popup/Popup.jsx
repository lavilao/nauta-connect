import { useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { blue, indigo } from '@mui/material/colors';
import { connect } from 'react-redux';
import Login from '../../screens/Login';
import Connect from '../../screens/Connect';
import Splash from '../../screens/Splash';
import NotifierMessenger from '../../components/NotifierMessenger';

const buildTheme = (themeMode) =>
  createTheme({
    palette: {
      primary: indigo,
      secondary: blue,
      mode:
        themeMode === 'auto'
          ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : themeMode || 'light',
    },
    components: {
      MuiMenuItem: { defaultProps: { dense: true } },
      MuiListItem: { defaultProps: { dense: true } },
    },
  });

const Popup = ({ login, configs, ...props }) => {
  const theme = useMemo(() => buildTheme(configs.theme), [configs.theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'HIDE_SPLASH' });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box {...props}>
        <Splash />
        <div style={{ paddingTop: 100 }} />
        {login.status === 'connected' ? <Connect /> : <Login />}
        <NotifierMessenger />
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
  configs: state.configs,
});

export default connect(mapStateToProps)(Popup);