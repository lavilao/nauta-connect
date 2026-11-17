import { useTheme } from '@mui/material/styles';

/**
 * Replaces the old `makeStyles` HOC from the removed @mui/styles package.
 * Returns the style classes used across the screens.
 */
const useStyles = () => {
  const theme = useTheme();
  return {
    logo: { maxHeight: 80, maxWidth: 80, marginTop: 10 },
    logoContainer: { textAlign: 'center' },
    buttonsContainer: { marginTop: theme.spacing(3) },
    ShareButtons: { marginTop: 20, textAlign: 'center' },
  };
};

export default useStyles;