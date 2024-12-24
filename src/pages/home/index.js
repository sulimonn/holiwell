import React from 'react';
import { Link } from 'react-router-dom';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './pagination.css';

// Import images
import LockedIcon from 'assets/images/icons/lock';

// material-ui
import { Box, Typography, Grid, Button } from '@mui/material';

// components
import TrainersList from 'components/TrainersList';
import Image from 'components/Image';
import { useAuth } from 'contexts/AuthContext';
import MobileHeaderContent from 'layout/MainLayout/Header/MobileHeaderContent/index';
import { useGetInfoQuery, useGetSliderQuery, useGetSlidersQuery } from 'store/reducers/trainers';
import { checkMediaType } from 'utils/other';
import Loader from 'components/Loader';

const Home = () => {
  const { data = [], isSuccess, isFetching } = useGetSlidersQuery();
  const { data: greeting = {} } = useGetSliderQuery(7);
  const { data: info = {}, isSuccess: infoSuccess, isFetching: infoFetching } = useGetInfoQuery();

  const links = [
    {
      id: 1,
      title: 'ТРЕНИРУЙСЯ',
      photo: '2.jpg',
      to: '/training',
    },
    {
      id: 2,
      title: 'СЛУШАЙ',
      photo: '3f.jpg',
      to: '/listening',
    },
    {
      id: 3,
      title: 'МЕДИТИРУЙ',
      photo: '1-2.jpg',
      to: '/meditation',
    },
    {
      id: 4,
      title: 'Ешь правильно',
      photo: 'listening.jpeg',
    },
  ];
  const { isAuthenticated, user, isLoading } = useAuth();

  if (!isSuccess || !infoSuccess || isLoading || infoFetching || isFetching) return <Loader />;

  const parseGreeting = (text) => {
    const linkPattern = /([\wа-яА-ЯёЁ]+)\/([\wа-яА-ЯёЁ-]+)/g;
    const tagPattern = /@([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)?)/g;
    const parts = [];
    let lastIndex = 0;

    text.replace(linkPattern, (match, name, link, index) => {
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }
      parts.push(
        <Link to={link} key={index} style={{ color: 'inherit' }}>
          {name}
        </Link>,
      );
      lastIndex = index + match.length;
      return match;
    });

    text.replace(tagPattern, (match, tag, index) => {
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }

      parts.push(
        tag === 'user.first_name'
          ? user.first_name
          : tag === 'user.last_name'
            ? user.last_name
            : user.email,
      );
      lastIndex = index + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };
  return (
    <>
      <MobileHeaderContent />
      <Box width="100%">
        <Box maxHeight={{ xs: 'max-content' }} width="100vw">
          <Box height={{ xs: '450px', sm: '500px', md: '600px' }}>
            <Swiper
              modules={[Pagination, A11y, Autoplay]}
              //utoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              style={{ height: '100%' }}
            >
              {data.map(
                (item) =>
                  item?.id !== 7 &&
                  item?.path_to_cover_first &&
                  item?.title_first && (
                    <SwiperSlide key={item.id} style={{ height: '100%' }}>
                      <Box sx={{ position: 'relative', height: '100%' }}>
                        <Box
                          component={
                            checkMediaType(item?.path_to_cover_first) === 'image' ? Image : 'video'
                          }
                          src={item?.path_to_cover_first}
                          alt="intro"
                          autoPlay
                          muted
                          loop
                          playsInline
                          loading="lazy"
                          sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            objectFit: 'cover',
                            objectPosition: 'center',
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
                            gap: 1.5,
                            px: 1,
                          }}
                          height="90%"
                          width="100%"
                          maxWidth={{ xs: '96%', md: '725px' }}
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
                            {item?.title_first}
                          </Typography>
                          <Typography
                            color="primary.contrastText"
                            fontSize={{ xs: '1.25rem', md: '1.5rem' }}
                            fontWeight="300"
                          >
                            {item?.text_first}
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ),
              )}
            </Swiper>
          </Box>
          <Box
            display={{ xs: 'flex' }}
            sx={{ height: '100%', px: 2, py: 4, gap: 2, flexDirection: 'column' }}
            maxWidth={{ xs: '100vw', md: '75vw' }}
            mx="auto"
          >
            <Typography
              variant="h1"
              fontSize="3rem"
              textTransform="uppercase"
              whiteSpace="nowrap"
              fontWeight={{ xs: 400 }}
              sx={{ maxWidth: { xs: '100%', md: '70%' } }}
            >
              {isAuthenticated
                ? parseGreeting(greeting?.title_second || '')
                : parseGreeting(greeting?.title_first || '')}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {isAuthenticated
                ? parseGreeting(greeting?.text_second || '')
                : parseGreeting(greeting?.text_first || '')}
            </Typography>
          </Box>
        </Box>
        <Box maxWidth={{ xs: '100vw', md: '75vw' }} px={{ xs: 2, sm: 3, md: 5 }} mx="auto">
          <Grid
            container
            spacing={2}
            sx={{ py: 12, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            {links.map((item) => {
              const props = item?.to && {
                to: item?.to,
                component: Link,
                sx: { textDecoration: 'none' },
              };
              return (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Box {...props}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: '202px', sm: '272px' },
                        overflow: 'hidden',
                        background: 'linear-gradient(0deg, #d5d5d5 0%, #dedede 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      {!item?.to && (
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 9,
                          }}
                        >
                          <Box
                            width="100%"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: '50px', sm: '100px' },
                                height: { xs: '50px', sm: '100px' },
                              }}
                            >
                              <LockedIcon />
                            </Box>
                          </Box>
                        </Box>
                      )}
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          zIndex: 0,
                        }}
                      >
                        <Image
                          src={require(`assets/images/girls/${item.photo}`)}
                          alt="intro"
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        fontWeight="400"
                        color="primary.main"
                        textTransform="uppercase"
                        sx={{ position: 'relative', zIndex: 1, px: { xs: 1.5, md: 2, lg: 3 } }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
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
                    src={info?.path_to_video}
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
                    {info.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="300" sx={{ whiteSpace: 'pre-line' }}>
                    {info.text}
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
