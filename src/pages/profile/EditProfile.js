import React from 'react';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputLabel,
  InputAdornment,
  Input,
  Stack,
  Typography,
  Container,
  Divider,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import Back from 'components/Back';
import Image from 'components/Image';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from 'contexts/AuthContext';
import Default from 'assets/images/users/default.png';

const EditProfile = () => {
  const { user, login } = useAuth();
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
        py={{ xs: 2, md: 8 }}
        bgcolor={{ xs: 'background.default', md: 'background.paper' }}
        width="100%"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Typography variant="h1" textAlign="center" textTransform="uppercase">
          Редактировать профиль
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ position: { xs: 'static', md: 'relative' } }}>
        <Back to={'/profile'} title="Редактировать профиль" />
        <Box maxWidth={580} mx="auto" pt={{ xs: 10, md: 6 }} pb={10}>
          <Formik
            initialValues={{
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
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
                <Stack spacing={{ xs: 0.4, md: 1 }} direction="column">
                  <Stack direction="column" alignItems="center" spacing={2} sx={{ pb: 3 }}>
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="div">
                        <Image
                          src={values.path_to_avatar || Default}
                          alt="Profile"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Typography>
                    </Box>
                    <Button sx={{ position: 'relative' }}>
                      <input
                        accept="image/*"
                        type="file"
                        style={{
                          width: '100%',
                          height: '100%',
                          inset: 0,
                          zIndex: 1,
                          opacity: 0,
                          position: 'absolute',
                        }}
                        multiple={false}
                        name="path_to_avatar"
                        id="path_to_avatar"
                        onChange={(e) => {
                          const event = {
                            ...e,
                            target: {
                              ...e.target,
                              value: URL.createObjectURL(e.target.files[0]),
                              name: 'path_to_avatar',
                              id: 'path_to_avatar',
                            },
                          };
                          console.log(event);
                          handleChange(event);
                        }}
                      />
                      <Typography variant="body2" color="text.primary">
                        СМЕНИТЬ ФОТО
                      </Typography>
                    </Button>
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  <Stack
                    spacing={5}
                    direction="row"
                    sx={{
                      fontSize: '1rem',
                      py: '10px',
                      alignItems: 'baseline',
                    }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', md: '300px' }, color: 'text.secondary' }}
                      htmlFor="first_name"
                    >
                      Имя
                    </InputLabel>
                    <Input
                      id="first_name"
                      type="text"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      fullWidth
                      error={Boolean(touched.first_name && errors.first_name)}
                      disableUnderline
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText error id="standard-weight-helper-text-firstname-edit">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  <Stack
                    spacing={5}
                    direction="row"
                    sx={{
                      fontSize: '1rem',
                      py: '10px',
                      alignItems: 'baseline',
                    }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', md: '300px' }, color: 'text.secondary' }}
                      htmlFor="last_name"
                    >
                      Фамилия
                    </InputLabel>
                    <Input
                      id="last_name"
                      type="text"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ваша фамилия"
                      fullWidth
                      error={Boolean(touched.last_name && errors.last_name)}
                      disableUnderline
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText error id="standard-weight-helper-text-lastname-edit">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  <Stack
                    spacing={5}
                    direction="row"
                    sx={{
                      fontSize: '1rem',
                      py: '10px',
                      alignItems: 'baseline',
                    }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', md: '300px' }, color: 'text.secondary' }}
                      htmlFor="email"
                    >
                      Email
                    </InputLabel>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="YourEmail@mail.com"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      disableUnderline
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-edit">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  <Stack
                    spacing={5}
                    direction="row"
                    sx={{
                      fontSize: '1rem',
                      py: '10px',
                      alignItems: 'baseline',
                    }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', md: '300px' }, color: 'text.secondary' }}
                      htmlFor="password"
                    >
                      Пароль
                    </InputLabel>
                    <Input
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password"
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
                      disableUnderline
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-edit">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  {errors.submit && (
                    <Stack>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Stack>
                  )}
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
                      Сохранить
                    </Button>
                  </AnimateButton>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default EditProfile;
