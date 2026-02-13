import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialogCustom = ({
  openInit,
  title,
  description,
  disagreeText,
  agreeText,
  handleClose,
  disagreeClick,
  agreeClick,
}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(openInit);
  }, [openInit]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagreeClick} color="secondary">
          {disagreeText}
        </Button>
        <Button onClick={agreeClick} color="secondary" autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogCustom;
