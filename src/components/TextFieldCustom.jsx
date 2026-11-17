import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { Error } from '@mui/icons-material';

const TextFieldCustom = ({
  label,
  id,
  type = undefined,
  fullWidth = true,
  errors,
  isSubmitting,
  next = undefined,
  submitAction = undefined,
  submitted,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <TextField
      {...props}
      sx={{ mt: 1.25 }}
      {...field}
      disabled={isSubmitting}
      onBlur={(ev) => {
        if (field.name === 'username')
          chrome.runtime.sendMessage({
            type: 'LOAD_USER_STORE',
            payload: { username: ev.target.value },
          });
        field.onBlur(ev);
      }}
      error={submitted && !!errors[field.name]}
      variant="outlined"
      size="small"
      fullWidth={fullWidth}
      label={label}
      id={id}
      type={type}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !!next) {
          event.preventDefault();
          next.focus();
        } else if (event.key === 'Enter' && !!submitAction) {
          event.preventDefault();
          submitAction();
        }
      }}
      slotProps={{
        input: {
          endAdornment: errors[field.name] ? (
            <InputAdornment position="end">
              <Tooltip title={errors[field.name]} arrow>
                <Error />
              </Tooltip>
            </InputAdornment>
          ) : null,
          sx: { borderRadius: 20 },
        },
      }}
    />
  );
};

export default TextFieldCustom;