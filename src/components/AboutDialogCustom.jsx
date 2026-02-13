import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { withStyles } from '@mui/styles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import ShareButtons from './SharedButtons';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(({
  children,
  classes,
  onClose,
  ...props
}) => {
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...props}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AboutDialogCustom = ({ configs, ...props }) => {
  const handleClose = () => {
    chrome.runtime.sendMessage({ type: 'CLOSE_DIALOG_ABOUT' });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={configs.openDialogAbout}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" onClose={handleClose}>
          Acerca de...
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" align="justify">
              Esta extensión le permite conectarse a la red Nauta de ETECSA de
              forma rápida, fácil y segura.
            </Typography>
            <br />
            <ShareButtons />
            <Typography variant="body2" align="justify">
              Ayuda a que los demás usuarios que nos encuentren, dale a conocer
              sobre lo útil que te ha resultado esta extensión, califícanos y
              deja una reseña en la página de la tienda.
              <br />
              <Link
                href={configs.urlShared}
                color="secondary"
                target="_blank"
                rel="noopener"
              >
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
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    configs: state.configs,
  };
};

export default connect(mapStateToProps)(AboutDialogCustom);
