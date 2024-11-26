import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Container, Typography, Stack } from '@mui/material';

// project import
import Logo from 'components/Logo/Logo';

// assets
import GooglePlay from 'assets/images/stores/googlePlay.png';
import AppStore from 'assets/images/stores/appStore.png';
import { useAuth } from 'contexts/AuthContext';
import { openProfile } from 'store/reducers/menu';

const Footer = () => {
  const { isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();
  const { pages } = useSelector((state) => state.menu);
  return (
    <Box
      component="footer"
      position="relative"
      bottom={0}
      width="100%"
      borderTop={1}
      borderColor="divider"
      pt={6.5}
      pb={3.5}
      display={{ xs: 'none', sm: 'block' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Stack direction="row" spacing={4} justifyContent="space-between">
            <Stack xs={4.5} textAlign="center">
              <Box display="flex" flexDirection="column" textAlign="left" width="400px">
                <Box width="160px">
                  <Logo />
                </Box>
                <Typography variant="h5" color="text.primary" fontWeight="300" my={1.5}>
                  Скачайте приложение Holiwell, чтобы заниматься в любое время и в любом месте.
                </Typography>
                <Box display="flex" gap={2} mt={2}>
                  <Box maxWidth="198px" maxHeight="60px">
                    <Link to="/">
                      <img
                        src={GooglePlay}
                        alt="Google Play"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Link>
                  </Box>
                  <Box maxWidth="198px" maxHeight="60px">
                    <Link to="/">
                      <img
                        src={AppStore}
                        alt="App Store"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Stack xs={7.5}>
              <Stack direction="column" spacing={6} height="100%">
                <Stack direction="row" spacing={6} justifyContent="space-between">
                  {pages.map((child, i) => {
                    return (
                      <Typography
                        component={Link}
                        to={'/' + child.slug}
                        variant="h5"
                        key={i}
                        color="primary"
                        textTransform="uppercase"
                        sx={{
                          textDecoration: 'none ',
                          transition: 'color 0.2s ease',
                          '&:hover': { color: 'text.secondary' },
                        }}
                      >
                        {child.title}
                      </Typography>
                    );
                  })}
                  <Typography
                    component={Link}
                    to={'https://t.me/holiwell'}
                    target="_blank"
                    variant="h5"
                    color="text.secondary"
                    textTransform="uppercase"
                    sx={{
                      textDecoration: 'none ',
                      transition: 'color 0.2s ease',
                      '&:hover': { color: 'text.secondary' },
                    }}
                  >
                    Телеграмм
                  </Typography>
                  {isAuthenticated ? (
                    <Typography
                      variant="h5"
                      color={'primary'}
                      textTransform="uppercase"
                      sx={{ textDecoration: 'none', cursor: 'pointer' }}
                      onClick={async () => {
                        await logout();
                        dispatch(openProfile(false));
                      }}
                    >
                      Выйти
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      color={'text.secondary'}
                      textTransform="uppercase"
                      sx={{ textDecoration: 'none', cursor: 'pointer' }}
                      component={Link}
                      to={'/login'}
                    >
                      Войти
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Поддержка
                  </Typography>
                  <Stack direction="row" spacing={6}>
                    <Typography
                      component={Link}
                      to={'https://t.me/holiwell'}
                      variant="h5"
                      target="_blank"
                      color="primary"
                      textTransform="uppercase"
                      sx={{
                        textDecoration: 'none ',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'text.secondary' },
                      }}
                    >
                      Телеграмм-чат
                    </Typography>
                    <Typography
                      component={Link}
                      to={'mailto:holiwell@mail.com'}
                      variant="h5"
                      target="_blank"
                      color="primary"
                      textTransform="uppercase"
                      sx={{
                        textDecoration: 'none ',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'text.secondary' },
                      }}
                    >
                      holiwell@mail.com
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto">
            <Stack direction="row" spacing={2}>
              <Typography
                component={Link}
                to={'/privacy-policy'}
                variant="subtitle1"
                color="primary"
                sx={{
                  textDecoration: 'none ',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: 'text.secondary' },
                }}
              >
                Политика конфиденциальности
              </Typography>
              <Typography
                component={Link}
                to={''}
                variant="subtitle1"
                color="primary"
                sx={{
                  textDecoration: 'none ',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: 'text.secondary' },
                }}
              >
                Публичная оферта
              </Typography>
            </Stack>

            <Typography
              variant="subtitle1"
              color="primary"
              sx={{
                textDecoration: 'none ',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'text.secondary' },
              }}
            >
              © {new Date().getFullYear()} Holiwell
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
