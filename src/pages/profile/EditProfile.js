import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Input,
  Stack,
  Typography,
  Container,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const EditProfile = () => {
  const login = () => {};
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box width="100%">
      <Box
        height={{ xs: 'auto', md: 200 }}
        bgcolor="background.paper"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h2" color="text.primary" textTransform="uppercase" fontWeight="500">
          Редактировать профиль
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Box maxWidth={580} mx="auto">
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
                if (response.error) {
                  if (response.error && response.error.status === 400) {
                    setErrors({
                      email: true,
                      password: true,
                      submit: 'Неправильная почта или пароль',
                    });
                  }
                  setStatus({ success: false });
                  setSubmitting(false);
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
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack spacing={0}>
                      <Input
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
                      <Input
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
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={2}
                    >
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
                  {errors.submit && (
                    <Grid item xs={12} sx={{ pt: '0 !important' }}>
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
                        Войти
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default EditProfile;
