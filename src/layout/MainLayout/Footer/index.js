import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { Box, Container, Typography, Stack } from '@mui/material';

// project import
import Logo from 'components/Logo/Logo';

// assets
import GooglePlay from 'assets/images/stores/googlePlay.png';
import AppStore from 'assets/images/stores/appStore.png';
//import { useAuth } from 'contexts/AuthContext';
//import { openProfile } from 'store/reducers/menu';

const Footer = () => {
  //const { isAuthenticated, logout } = useAuth();
  //const dispatch = useDispatch();
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
      display={{ xs: 'block' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 4 }}
            justifyContent="space-between"
          >
            <Stack xs={4.5} textAlign="center">
              <Box
                display="flex"
                flexDirection="column"
                textAlign="left"
                width={{ xs: '100%', md: '400px' }}
              >
                <Box width="160px">
                  <Logo />
                </Box>
                <Typography variant="h5" color="text.primary" fontWeight="300" my={1.5}>
                  Скачайте приложение Holiwell, чтобы заниматься в любое время и в любом месте.
                </Typography>
                <Box display="flex" gap={2} mt={{ xs: 0, md: 2 }}>
                  <Box maxWidth={{ xs: 110, md: '198px' }} maxHeight="60px">
                    <Link to="/">
                      <img
                        src={GooglePlay}
                        alt="Google Play"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Link>
                  </Box>
                  <Box maxWidth={{ xs: 110, md: '198px' }} maxHeight="60px">
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
              <Stack direction="column" spacing={{ xs: 2, md: 6 }} height="100%">
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent={{ xs: 'flex-start', md: 'space-between' }}
                  flexWrap="wrap"
                  gap={{ xs: 1, sm: 6 }}
                >
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
                </Stack>
                <Stack spacing={2} direction="row">
                  <Stack direction="column" spacing={{ xs: 1, sm: 3 }}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Поддержка
                    </Typography>
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
                  </Stack>
                  <Stack direction="column" spacing={{ xs: 1, sm: 3 }}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Почта
                    </Typography>
                    <Typography
                      component={Link}
                      to={'mailto:holiwell@mail.com'}
                      variant="h5"
                      target="_blank"
                      color="primary"
                      sx={{
                        textDecoration: 'none ',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'text.secondary' },
                      }}
                    >
                      holiwell@mail.ru
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            mt="auto"
            width="100%"
            gap={{ xs: 3, md: 1 }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
              <Typography
                component={Link}
                to="/privacy-policy"
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
                to="/terms-of-use"
                variant="subtitle1"
                color="primary"
                sx={{
                  textDecoration: 'none ',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: 'text.secondary' },
                }}
              >
                Публичная оферта и условия обслуживания
              </Typography>
            </Stack>
            <Typography
              variant="subtitle1"
              color="primary"
              whiteSpace="nowrap"
              sx={{
                textDecoration: 'none ',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'text.secondary' },
                alignSelf: 'flex-end',
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
