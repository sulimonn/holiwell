import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
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
import AnimateButton from 'components/@extended/AnimateButton';
import { maskEmail, strengthColor, strengthIndicator } from 'utils/password-strength';
import VerificationInput from 'react-verification-input';
import './pincode.css';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from 'contexts/AuthContext';
import { useSendCodeMutation } from 'store/reducers/authApi';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const { register } = useAuth();
  const [sendCode, { isLoading }] = useSendCodeMutation();
  const [codeSent, setCodeSent] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(59);
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    if (codeSent && resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout((prevTimeout) => {
          if (prevTimeout <= 1) {
            clearInterval(timer);
            return 0; // Reset the countdown
          }
          return prevTimeout - 1;
        });
      }, 1000);

      // Clean up the interval when component unmounts or codeSent changes
      return () => clearInterval(timer);
    }
  }, [codeSent, resendTimeout]);

  // Modify resendCode to work with Formik
  const resendCode = async (email, setErrors) => {
    try {
      const response = await sendCode(email);
      if (response?.error) {
        setErrors({ submit: 'Ошибка отправки кода' });
      } else {
        setResendTimeout(59); // Reset resend timeout to 60 seconds when a new code is sent
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка отправки кода' });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password2: '',
          code: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('Имя обязательно'),
          last_name: Yup.string().required('Фамилия обязательна'),
          email: Yup.string()
            .email('Email-адрес введен некорректно')
            .max(255)
            .required('Email обязателен'),
          password: Yup.string()
            .max(255)
            .required('Пароль обязателен')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              'Пароль должен содержать хотя бы одну букву, одну цифру и иметь длину не менее 8 символов.',
            ),
          password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Подтверждение пароля обязательно'),
          code: Yup.string(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (level.color === 'error.main') {
            return setErrors({
              password: true,
              submit:
                'Пароль должен содержать хотя бы одну букву, одну цифру и иметь длину не менее 8 символов.',
            });
          }
          if (!codeSent) {
            try {
              const response = await sendCode(values.email);

              if (!response?.error) {
                setCodeSent(true);
                setResendTimeout(59);
              }

              if (response?.error) {
                if (response?.error?.status === 409) {
                  setErrors({
                    email: true,
                    submit: 'Пользователь с такой почтой уже существует',
                  });
                  setStatus({ success: false });
                  return;
                }
                if (response?.error?.status === 422) {
                  setErrors({
                    email: true,
                    submit: 'Ошибка отправки кода',
                  });
                  setStatus({ success: false });
                  return;
                } else {
                  setErrors({
                    submit: 'Что-то пошло не так. Попробуйте еще раз',
                  });
                  setStatus({ success: false });
                  return;
                }
              }
            } catch (error) {
              setErrors({
                email: true,
                submit: 'Ошибка отправки кода',
              });
            }
          } else {
            try {
              const response = await register(values);

              if (response?.status === 403) {
                setErrors({
                  code: 'Неверный код',
                });
              }
              if (response?.status === 400 || response?.error?.status === 400) {
                setErrors({
                  code: 'Пользователь с такой почтой уже существует',
                });
                setStatus({ success: false });
                return;
              }
              if (response?.error) {
                if (response?.status === 422) {
                  setErrors({
                    first_name: true,
                    last_name: true,
                    email: true,
                    password: true,
                    submit: 'Введены некорректные данные',
                  });
                  setStatus({ success: false });
                }
              }

              if (response?.originalStatus === 500) {
                setErrors({
                  submit: 'Что-то пошло не так. Попробуйте еще раз',
                });
              }
              setStatus({ success: false });
              setSubmitting(false);

              if (response === null) {
                window.location.replace('/'); // Redirect to the main page
              }
            } catch (err) {
              setStatus({ success: false });

              setErrors({ submit: err.message });
              setSubmitting(false);
            }
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
          setFieldValue,
          setErrors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {!codeSent ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.first_name && errors.first_name)}
                      id="first_name-login"
                      type="text"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Имя"
                      inputProps={{}}
                      disabled={isLoading}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText error id="helper-text-first_name-signup">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.last_name && errors.last_name)}
                      id="last_name-login"
                      type="text"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Фамилия"
                      inputProps={{}}
                      disabled={isLoading}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText error id="helper-text-last_name-signup">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email"
                      inputProps={{}}
                      disabled={isLoading}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
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
                      id="password-signup"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      disabled={isLoading}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
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
                      placeholder="******"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password2 && errors.password2)}
                      id="password2-signup"
                      type="password"
                      value={values.password2}
                      name="password2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        visibility: showPassword ? 'hidden' : 'visible',
                        //opacity: showPassword ? 1 : 0,
                        pointerEvents: !showPassword ? 'all' : 'none',
                      }}
                      disabled={isLoading}
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
                      placeholder="******"
                      inputProps={{}}
                    />
                    {touched.password2 && errors.password2 && (
                      <FormHelperText error id="helper-text-password2-signup">
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

                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    fontWeight="100"
                    textAlign="center"
                    lineHeight="0.1rem"
                  >
                    Нажимая "Зарегистрироваться", вы принимаете &nbsp;
                    <Link
                      variant="subtitle2"
                      fontWeight="300"
                      component={RouterLink}
                      to="/privacy-policy"
                      lineHeight="inherit"
                    >
                      Политику конфиденциальности
                    </Link>
                    &nbsp; и &nbsp;
                    <Link
                      variant="subtitle2"
                      fontWeight="300"
                      component={RouterLink}
                      to="/terms-of-use"
                      lineHeight="inherit"
                    >
                      Условия обслуживания
                    </Link>
                  </Typography>
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
                      disabled={isSubmitting || isLoading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Зарегистрироваться
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={0} direction="row" alignItems="center" justifyContent="center">
                    <Typography variant="body1" textAlign="center" fontWeight="100">
                      Код подтверждения отправлен на почту {maskEmail(values.email)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={
                      (errors?.code ? 'shake pin-error' : '') + (isSubmitting ? ' disabled' : '')
                    }
                  >
                    <VerificationInput
                      autoFocus
                      length={4}
                      validChars="0123456789"
                      placeholder=" "
                      disabled={isSubmitting}
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                        characterFilled: 'character--filled',
                      }}
                      value={values.code}
                      onChange={(value) => {
                        if (!isSubmitting) {
                          setFieldValue('code', value);
                          if (value.length === 4) {
                            handleSubmit();
                          }
                        }
                      }}
                    />
                  </Stack>
                  <Stack
                    mt={2}
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {errors.code && (
                      <FormHelperText error id="helper-text-code-signup">
                        <Typography variant="body2">{errors.code}</Typography>
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {resendTimeout === 0 ? (
                  <Grid item xs={12} mt={2}>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.primary"
                      fontWeight="100"
                      onClick={() => {
                        resendCode(values.email, setErrors);
                      }}
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        width: 'fit-content',
                        mx: 'auto',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          width: '100%',
                          height: '2px',
                          backgroundColor: isLoading ? 'text.disabled' : 'primary.main',
                        },
                        color: isLoading ? 'text.disabled' : 'primary.main',
                      }}
                      disabled={isLoading}
                    >
                      Отправить код еще раз
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={12} mt={2}>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.primary"
                      fontWeight="100"
                    >
                      Отправить повторно через:
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.primary"
                      fontWeight="100"
                    >
                      {`00:${resendTimeout < 10 ? `0${resendTimeout}` : resendTimeout}`}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
