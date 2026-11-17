import Button from '@mui/material/Button';

const ButtonCustom = ({ fullWidth = true, onClick, children, ...props }) => {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      color="primary"
      onClick={onClick}
      size="small"
      sx={{ borderRadius: 5 }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;