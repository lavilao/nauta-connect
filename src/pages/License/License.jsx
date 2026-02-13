import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { blue, indigo } from '@mui/material/colors';
import { createTheme } from '@mui/material';
import Content from './content';
import Container from '@mui/material/Container';

const License = ({ configs, ...props }) => {
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
      <Container maxWidth="md">
        <Content />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    configs: state.configs,
  };
};

export default connect(mapStateToProps)(License);
