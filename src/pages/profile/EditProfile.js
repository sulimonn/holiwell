import React from 'react';
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  Input,
  Stack,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Back from 'components/Back';
import Image from 'components/Image';
import { useAuth } from 'contexts/AuthContext';
import Default from 'assets/images/users/default.png';
import { useEditProfileMutation, useUpdateAvatarMutation } from 'store/reducers/userApi';

const EditProfile = () => {
  const { user } = useAuth();
  const [editProfile] = useEditProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

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
              first_name: user?.first_name || '',
              last_name: user?.last_name || '',
              email: user?.email || '',
              submit: null,
              path_to_avatar: user?.path_to_avatar || '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email-адрес введен некорректно')
                .max(255)
                .required('Email обязателен'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                const response = await editProfile({ ...values });
                if (response.error) {
                  if (response.error.status === 400) {
                    setErrors({
                      email: true,
                      password: true,
                      submit: 'Неправильная почта или пароль',
                    });
                  }
                  setStatus({ success: false });
                  setSubmitting(false);
                } else {
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
            }) => (
              <form noValidate onChange={handleSubmit}>
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
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={process.env.REACT_APP_BASE_URL + values.path_to_avatar || Default}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
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
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const formData = new FormData();
                          formData.append('avatar', file);
                          const response = await updateAvatar(formData);
                          if (!response.error) {
                            console.log(response);
                          }
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
                    sx={{ fontSize: '1rem', py: '10px', alignItems: 'baseline' }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', sm: '300px' }, color: 'text.secondary' }}
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
                    sx={{ fontSize: '1rem', py: '10px', alignItems: 'baseline' }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', sm: '300px' }, color: 'text.secondary' }}
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
                    sx={{ fontSize: '1rem', py: '10px', alignItems: 'baseline' }}
                  >
                    <InputLabel
                      sx={{ width: { xs: '110px', sm: '300px' }, color: 'text.secondary' }}
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
                  {errors.submit && (
                    <Stack>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Stack>
                  )}
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
