import React, { useEffect, useState } from 'react';
import Login from '../../screens/Login';
import NotifierMessenger from '../../components/NotifierMessenger';
import { connect } from 'react-redux';
import Connect from '../../screens/Connect';
import useStyles from '../../screens/useStyles';
import Splash from '../../screens/Splash';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { blue, indigo } from '@mui/material/colors';

const Popup = ({ login, configs, ...props }) => {
  let [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: indigo,
        secondary: blue,
        mode:
          configs.theme === 'auto'
            ? window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : configs.theme || 'light',
      },
      components: {
        MuiMenuItem: { defaultProps: { dense: true } },
        MuiListItem: { defaultProps: { dense: true } },
      },
    })
  );
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'HIDE_SPLASH' });
    }, 1000);
  }, []);

  useEffect(() => {
    const themeNew = createTheme({
      palette: {
        primary: indigo,
        secondary: blue,
        mode:
          configs.theme === 'auto'
            ? window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : configs.theme || 'light',
      },
      components: {
        MuiMenuItem: { defaultProps: { dense: true } },
        MuiListItem: { defaultProps: { dense: true } },
      },
    });
    setTheme(themeNew);
  }, [configs.theme]);

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

const mapStateToProps = (state) => {
  return {
    login: state.login,
    configs: state.configs,
  };
};

export default connect(mapStateToProps)(Popup);
