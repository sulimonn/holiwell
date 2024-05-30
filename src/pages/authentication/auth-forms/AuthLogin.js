import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { login } from 'store/reducers/authApi';
import { getMe } from 'store/reducers/auth';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email-адрес введен некорректно')
            .max(255)
            .required('Email обязателен'),
          password: Yup.string().max(255).required('Пароль обязателен'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await login({
              username: values.email,
              password: values.password,
            });
            console.log(response.headers.getSetCookie());
            if (response.error) {
              if (response.error?.data?.detail === 'LOGIN_BAD_CREDENTIALS' || !response.ok) {
                setErrors({
                  email: true,
                  password: true,
                  submit: 'Неправильная почта или пароль',
                });
              }
              setStatus({ success: false });
              setSubmitting(false);
            } else {
              const response = await dispatch(getMe());
              if (response.error) {
                setStatus({ success: false });
                setErrors({ submit: response.error });
                setSubmitting(false);
              } else {
                navigate('/', { replace: true });
              }
            }
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.username}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Пароль"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Link
                    variant="body2"
                    component={RouterLink}
                    to="/forgot-password"
                    color="text.primary"
                    fontWeight="100"
                  >
                    Забыли пароль?
                  </Link>
                </Stack>
              </Grid>
              {/* {errors.submit && (
                <Grid item xs={12} sx={{ pt: '0 !important' }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )} */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Войти
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12} sx={{ my: 1 }}>
                <Divider>
                  <Typography variant="body2" fontWeight="100">
                    Войдите с помощью
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
