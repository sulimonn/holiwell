import React from 'react';
import { Link } from 'react-router-dom';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './pagination.css';

// Import images
import IntroGirl from 'assets/images/girls/intro.jpeg';
import Listen from 'assets/images/girls/listening.jpeg';

// material-ui
import { Box, Typography, Grid, Button } from '@mui/material';

// components
import TrainersList from 'components/TrainersList';
import Image from 'components/Image';
import { useAuth } from 'contexts/AuthContext';
import MobileHeaderContent from 'layout/MainLayout/Header/MobileHeaderContent/index';

const Home = () => {
  const swiperData = [
    {
      id: 1,
      title: 'ТРЕНИРУЙСЯ',
      decription:
        'Отличный способ научиться сосредоточиться, снизить стресс и улучшить свое общее самочувствие',
      photo: IntroGirl,
      to: '/training',
    },
    {
      id: 2,
      title: 'СЛУШАЙ',
      decription:
        'Отличный способ научиться сосредоточиться, снизить стресс и улучшить свое общее самочувствие',
      photo: IntroGirl,
      to: '/listen',
    },
    {
      id: 3,
      title: 'МЕДИТИРУЙ',
      decription:
        'Отличный способ научиться сосредоточиться, снизить стресс и улучшить свое общее самочувствие',
      photo: IntroGirl,
      to: '/meditation',
    },
  ];
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <MobileHeaderContent />
      <Box width="100%">
        <Box minHeight={{ xs: 'fit-content', md: 'calc(100vh - 77px)' }} width="100vw">
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
          >
            {swiperData.map((item) => (
              <SwiperSlide key={item.id}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component={Image}
                    src={item.photo}
                    alt="intro"
                    sx={{
                      width: '100%',
                      height: { xs: '120%', md: '125%' },
                      position: 'absolute',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      top: { xs: '-20%', md: '-25%' },
                      left: 0,
                      right: 0,
                      zIndex: -1,
                      filter: 'brightness(0.7)',
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      zIndex: 1,
                      position: 'relative',
                      minHeight: { xs: '65vh', md: 'calc(100vh - 77px)' },
                      top: { xs: 0, md: '-4em' },
                      gap: 1.5,
                    }}
                    width="100%"
                    maxWidth="725px"
                    mx="auto"
                    textAlign="center"
                    flexDirection="column"
                  >
                    <Typography
                      component="h1"
                      fontSize={{ xs: '3rem', md: '6rem' }}
                      fontWeight="500"
                      color="primary.contrastText"
                      textAlign="center"
                      textTransform="uppercase"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="primary.contrastText"
                      fontSize={{ xs: '1.25rem', md: '1.5rem' }}
                      fontWeight="300"
                    >
                      {item.decription}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            display={{ xs: 'flex', md: 'none' }}
            sx={{ height: '100%', px: 2, py: 4, gap: 2, flexDirection: 'column' }}
          >
            <Typography
              variant="h1"
              fontSize="3rem"
              textTransform="uppercase"
              fontWeight={{ xs: 400 }}
            >
              Добро пожаловать{isAuthenticated && ', ' + user.first_name}!
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              Не ограничивай себя в движении,{'\n\n'}В здоровом теле здоровый дух. Регулярная
              практика и позитивный настрой дадут тебе энергию для реализации твоей цели 🎯
            </Typography>
          </Box>
        </Box>
        <Box maxWidth={{ xs: '100vw', md: '75vw' }} px={{ xs: 2, sm: 3, md: 4 }} mx="auto">
          <Grid
            container
            spacing={2}
            sx={{ py: 12, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            {swiperData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '202px',
                      overflow: 'hidden',
                      background: 'linear-gradient(0deg, #d5d5d5 0%, #dedede 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      px: { xs: 1.5, md: 2, lg: 3 },
                    }}
                  >
                    <Box
                      sx={{
                        width: '80%',
                        height: 'auto',
                        position: 'absolute',
                        top: { xs: '-35%', md: '-25%', lg: '-45%' },
                        right: { xs: '-20%', md: '-20%', lg: '-20%' },
                        zIndex: 0,
                      }}
                    >
                      <Image
                        src={Listen}
                        alt="intro"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="400"
                      color="primary.main"
                      textTransform="uppercase"
                      sx={{ position: 'relative', zIndex: 1 }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box maxWidth={{ xs: '100vw', md: '75vw' }} px={{ xs: 2, sm: 3, md: 4 }} mx="auto">
          <Box
            sx={{
              py: 12,
              borderBottom: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <Box>
                  <Image
                    src={IntroGirl}
                    alt="intro"
                    style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  justifyContent="center"
                  height="100%"
                  pb={{ md: 5 }}
                >
                  <Typography variant="h2" fontWeight="400" textTransform="uppercase">
                    O Holiwell
                  </Typography>
                  <Typography variant="h5" fontWeight="300">
                    Равным образом дальнейшее развитие различных форм деятельности влечет за собой
                    процесс внедрения и модернизации соответствующий условий активизации.
                    Разнообразный и богатый опыт сложившаяся структура организации представляет
                    собой интересный эксперимент проверки форм развития.
                  </Typography>

                  {!isAuthenticated && (
                    <Box display="flex" gap={2} pt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                        sx={{ fontSize: { xs: '0.85rem', md: '1.25rem' } }}
                      >
                        Войти
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/register"
                        sx={{ fontSize: { xs: '0.85rem', md: '1.25rem' } }}
                      >
                        Зарегистрироваться
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <TrainersList wrap={false} />
      </Box>
    </>
  );
};

export default Home;
