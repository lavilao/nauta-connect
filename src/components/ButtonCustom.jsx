import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: 20,
  },
}));

const ButtonCustom = ({ fullWidth = true, onClick, children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      variant="contained"
      fullWidth={fullWidth}
      color="primary"
      onClick={onClick}
      size="small"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
