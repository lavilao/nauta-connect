import { useField } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CheckBoxCustom = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel control={<Checkbox {...props} {...field} />} label={label} />
  );
};

export default CheckBoxCustom;