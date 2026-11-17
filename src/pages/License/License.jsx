import { useMemo } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, indigo } from '@mui/material/colors';
import Content from './content';
import Container from '@mui/material/Container';

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

const License = ({ configs }) => {
  const theme = useMemo(() => buildTheme(configs.theme), [configs.theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Content />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  configs: state.configs,
});

export default connect(mapStateToProps)(License);