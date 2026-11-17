import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import TextFieldCustom from '../../components/TextFieldCustom';
import schemaValidation from './schemaValidation';
import useStyles from '../useStyles';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import ButtonCustom from '../../components/ButtonCustom';
import CircularProgress from '@mui/material/CircularProgress';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Container from '@mui/material/Container';
import AutoCompleteFieldCustom from '../../components/AutoCompleteFieldCustom';

const initialValue = {
  username: '',
  password: '',
  remember: false,
};

/**
 * The form is rendered inside the Formik render prop, so the hooks that depend
 * on the Formik state have to live in a dedicated component.
 */
const LoginForm = ({ login, userStorage }) => {
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values) => {
        chrome.runtime.sendMessage({ type: 'LOGIN', payload: values });
      }}
      validationSchema={schemaValidation}
    >
      {(formikBag) => (
        <LoginFields formikBag={formikBag} login={login} userStorage={userStorage} />
      )}
    </Formik>
  );
};

const LoginFields = ({ formikBag, login, userStorage }) => {
  const classes = useStyles();

  useEffect(() => {
    formikBag.setSubmitting(login.status === 'loading');
  }, [login.status, formikBag]);

  useEffect(() => {
    if (userStorage.password) formikBag.setFieldValue('password', userStorage.password);
  }, [userStorage.password, formikBag]);

  return (
    <Form>
      <AutoCompleteFieldCustom
        label="Usuario"
        errors={formikBag.errors}
        isSubmitting={formikBag.isSubmitting}
        formikBag={formikBag}
        name="username"
        id="username"
        next={document.querySelector('#password')}
        submitted={formikBag.submitCount > 0}
      />
      <TextFieldCustom
        label="Contraseña"
        errors={formikBag.errors}
        isSubmitting={formikBag.isSubmitting}
        submitAction={formikBag.submitForm}
        name="password"
        id="password"
        type="password"
        submitted={formikBag.submitCount > 0}
      />

      <CheckBoxCustom label="Guardar contraseña" name="remember" id="remember" />

      <div className={classes.buttonsContainer}>
        <ButtonCustom
          onClick={formikBag.submitForm}
          startIcon={
            formikBag.isSubmitting ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <ExitToAppIcon />
            )
          }
        >
          CONECTARSE
        </ButtonCustom>
      </div>
    </Form>
  );
};

const Login = ({ login, userStorage, configs }) => {
  return (
    <Container
      sx={{
        zIndex: -1000,
        position:
          configs.animSplashInit || configs.animSplashDisconnect ? 'absolute' : 'unset',
      }}
    >
      <LoginForm login={login} userStorage={userStorage} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
  userStorage: state.userStorage,
  configs: state.configs,
});

export default connect(mapStateToProps)(Login);