import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import ShareButtons from './SharedButtons';

const DialogTitleCustom = ({ children, onClose, ...props }) => {
  const theme = useTheme();
  return (
    <DialogTitle sx={{ margin: 0, padding: theme.spacing(2) }} {...props}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const AboutDialogCustom = ({ configs }) => {
  const handleClose = () => {
    chrome.runtime.sendMessage({ type: 'CLOSE_DIALOG_ABOUT' });
  };

  return (
    <Dialog
      fullScreen
      open={configs.openDialogAbout}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitleCustom id="responsive-dialog-title" onClose={handleClose}>
        Acerca de...
      </DialogTitleCustom>
      <DialogContent>
        <DialogContentText component="div">
          <Typography variant="body2" align="justify">
            Esta extensión le permite conectarse a la red Nauta de ETECSA de
            forma rápida, fácil y segura.
          </Typography>
          <br />
          <ShareButtons />
          <Typography variant="body2" align="justify">
            Ayuda a que los demás usuarios que nos encuentren, dale a conocer
            sobre lo útil que te ha resultado esta extensión, califícanos y deja
            una reseña en la página de la tienda.
            <br />
            <Link href={configs.urlShared} color="secondary" target="_blank" rel="noopener">
              Página de la Tienda
            </Link>
          </Typography>
          <br />
          <Typography variant="body2" align="justify">
            Este es un proyecto de código abierto en el cual usted puede
            colaborar.
            <br />
            <Link
              href="https://github.com/mmaciass/nauta-connect"
              color="secondary"
              target="_blank"
              rel="noopener"
            >
              Código en Github
            </Link>
          </Typography>
          <br />
          <Typography variant="body2" align="center">
            Ing. Roniel López Álvarez
            <br />
            Ing. Marcos Macias Sánchez
            <br />
            2020
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  configs: state.configs,
});

export default connect(mapStateToProps)(AboutDialogCustom);