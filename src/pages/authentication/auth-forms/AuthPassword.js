import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, FormHelperText, Grid, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import VerificationInput from 'react-verification-input';
import './pincode.css';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { useForgotPasswordMutation } from 'store/reducers/authApi';
import { setCode } from 'store/reducers/menu';
import { maskEmail } from 'utils/password-strength';
import { useAuth } from 'contexts/AuthContext';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthPassword = () => {
  const { user, isAuthenticated } = useAuth();
  const [codeSent, setCodeSent] = React.useState(false);
  const [resendTimeout, setResendTimeout] = React.useState(59);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [code, setEmailCode] = React.useState();
  const [emailSent, setEmailSent] = React.useState(false);
  const submitRef = useRef(null);
  React.useEffect(() => {
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

  React.useEffect(() => {
    if (isAuthenticated) {
      if (submitRef.current) {
        submitRef.current.click();
      }
    }
  }, [isAuthenticated]);

  // Modify resendCode to work with Formik
  const resendCode = async (credintials, setErrors) => {
    try {
      const response = await forgotPassword(credintials);
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
          email: user?.email || '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email-адрес введен некорректно')
            .max(255)
            .required('Email обязателен'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await forgotPassword(values);
            if (response?.error) {
              setStatus({ success: false });
              setSubmitting(false);
            } else {
              setCodeSent(true);
              setResendTimeout(59);
              setEmailSent(true);
              setStatus({ success: true });
              setSubmitting(false);
            }
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
          setErrors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {!emailSent ? (
              <Grid container spacing={2}>
                <>
                  <Grid item xs={12} sx={{ pt: '20px !important' }}>
                    <Typography variant="body2" color="textSecondary">
                      Введите адрес вашей электронной почты, на который мы пришлем код для
                      восстановления пароля
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      spacing={0}
                      className={
                        (errors?.code ? 'shake pin-error' : '') + (isSubmitting ? ' disabled' : '')
                      }
                    >
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={user?.email || values.email}
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
                </>

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                {!emailSent && (
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
                        ref={submitRef}
                      >
                        Отправить
                      </Button>
                    </AnimateButton>
                  </Grid>
                )}
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
                  <Stack spacing={0} direction="row" alignItems="center" justifyContent="center">
                    <VerificationInput
                      autoFocus
                      length={4}
                      validChars="0123456789"
                      placeholder=" "
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                        characterFilled: 'character--filled',
                      }}
                      onChange={(code) => {
                        setEmailCode(code);
                      }}
                      value={code}
                      onComplete={(code) => {
                        dispatch(setCode({ code, email: values.email }));
                        navigate(
                          window.location.pathname.includes('/forgot-password')
                            ? '/reset-password'
                            : '/change-password',
                        );
                      }}
                    />
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
                        resendCode(values, setErrors);
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

export default AuthPassword;
