import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { Error } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { connect } from 'react-redux';
import { storageGet } from '../utils/chrome';

const AutoCompleteFieldCustom = ({
  label,
  id,
  type = undefined,
  fullWidth = true,
  errors,
  isSubmitting,
  userStorage,
  next = undefined,
  submitAction = undefined,
  submitted,
  formikBag,
  ...props
}) => {
  const [field] = useField(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    storageGet(['users'], 'sync').then(({ users: storedUsers }) => {
      if (storedUsers) setUsers(storedUsers);
    });
  }, [userStorage.lastUpdate]);

  return (
    <Autocomplete
      freeSolo
      {...props}
      options={users}
      getOptionLabel={(option) => option.username}
      onInputChange={(event, newInputValue) => {
        formikBag.setFieldValue(id, newInputValue);
        if (field.name === 'username' && event.target.localName === 'li')
          chrome.runtime.sendMessage({
            type: 'LOAD_USER_STORE',
            payload: { username: newInputValue },
          });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          sx={{ mt: 1.25 }}
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
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  userStorage: state.userStorage,
});

export default connect(mapStateToProps)(AutoCompleteFieldCustom);