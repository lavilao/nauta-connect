import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { Error } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 10,
  },
  input: {
    borderRadius: 20,
  },
}));

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
  const classes = useStyles();
  const [field] = useField(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(['users'], ({ users }) => {
      if (users) {
        setUsers(users);
      }
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
          className={classes.field}
          {...params}
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
            ...params.InputProps,
            ...{
              endAdornment: errors[field.name] ? (
                <InputAdornment position="end">
                  <Tooltip title={errors[field.name]} arrow>
                    <Error />
                  </Tooltip>
                </InputAdornment>
              ) : null,
              className: classes.input,
            },
          }}
        />
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userStorage: state.userStorage,
  };
};

export default connect(mapStateToProps)(AutoCompleteFieldCustom);
