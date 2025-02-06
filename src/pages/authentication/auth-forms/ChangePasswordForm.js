import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  FormControl,
  Box,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { useChangePasswordMutation, useResetPasswordMutation } from 'store/reducers/authApi';
import { resetCode } from 'store/reducers/menu';
import { useAuth } from 'contexts/AuthContext';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// ============================|| FIREBASE - LOGIN ||============================ //

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { code, email } = useSelector((state) => state.menu);
  const [level, setLevel] = React.useState();
  // Extract token from URL
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  if (!code || !email) {
    navigate(
      window.location.pathname === '/reset-password' ? '/forgot-password' : '/update-password',
      { replace: true },
    );
  }

  const handleChangePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
  return (
    <Formik
      initialValues={{
        password: '',
        password2: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .max(255, 'Пароль должен быть не длиннее 255 символов')
          .required('Пароль обязателен')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Пароль должен содержать хотя бы одну букву, одну цифру и иметь длину не менее 8 символов.',
          ),
        password2: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
          .required('Подтверждение пароля обязательно'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        if (level.color === 'error.main') {
          return setErrors({
            password: true,
            submit:
              'Пароль должен содержать хотя бы одну букву, одну цифру и иметь длину не менее 8 символов.',
          });
        }
        try {
          const response = await changePassword({ password: values.password, code, email });

          if (response?.error) {
            setErrors({ submit: response.error.data.message || 'Ошибка сброса пароля' });
          }
          if (response?.data?.token) {
            const resetResponse = await resetPassword({ ...response.data });

            if (!resetResponse?.error) {
              await login({ username: email, password: values.password });
              window.location.replace('/');
              return;
            }
          }
        } catch (err) {
          setErrors({ submit: err.message || 'Произошла ошибка' });
        } finally {
          setSubmitting(false);
          dispatch(resetCode());
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <OutlinedInput
                  id="password-change"
                  type="password"
                  autoFocus
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleChangePassword(e.target.value);
                  }}
                  placeholder="Придумайте новый пароль"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="password-helper-text">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <OutlinedInput
                  id="password2-change"
                  type="password"
                  value={values.password2}
                  name="password2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Повторите пароль"
                  fullWidth
                  error={Boolean(touched.password2 && errors.password2)}
                />
                {touched.password2 && errors.password2 && (
                  <FormHelperText error id="password2-helper-text">
                    {errors.password2}
                  </FormHelperText>
                )}
              </Stack>
              <FormControl fullWidth sx={{ mt: 0.5 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
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
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
