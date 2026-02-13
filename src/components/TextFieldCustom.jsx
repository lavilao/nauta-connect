import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { Error } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 10,
  },
  input: {
    borderRadius: 20,
  },
}));

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
  const classes = useStyles();
  const [field] = useField(props);
  return (
    <TextField
      {...props}
      className={classes.field}
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
      onKeyPress={(event) => {
        if (event.key === 'Enter' && !!next) {
          event.preventDefault();
          next.focus();
        } else if (event.key === 'Enter' && !!submitAction) {
          event.preventDefault();
          submitAction();
        }
      }}
      InputProps={{
        endAdornment: errors[field.name] ? (
          <InputAdornment position="end">
            <Tooltip title={errors[field.name]} arrow>
              <Error />
            </Tooltip>
          </InputAdornment>
        ) : null,
        className: classes.input,
      }}
    />
  );
};

export default TextFieldCustom;
