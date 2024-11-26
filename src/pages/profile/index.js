import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Container, Divider } from '@mui/material';
import DefaultAvatar from 'assets/images/users/default.png';
import { useAuth } from 'contexts/AuthContext';
import Calendar from 'pages/calendar/index';
import MobileHeaderContent from 'layout/MainLayout/Header/MobileHeaderContent/index';
import { useGetFavouritesQuery, useMyViewedQuery } from 'store/reducers/userApi';
import ProfileLesson from './ProfileLesson';
import Loader from 'components/Loader';
import { useGetSliderQuery } from 'store/reducers/trainers';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: favorites = [], isFetching: isFavoritesFetching } = useGetFavouritesQuery();
  const { data: myVieweds = [], isFetching: isMyViewFetching } = useMyViewedQuery();
  const { data: calendarInfo = {} } = useGetSliderQuery(7);

  if (!user || isFavoritesFetching || isMyViewFetching) return <Loader />;
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
      <MobileHeaderContent color="black" />
      <Box width="100%" pt={{ xs: 6, md: 0 }}>
        <Box
          height={{ xs: 'auto', md: 350, lg: '400px' }}
          bgcolor={{ xs: 'transparent', md: 'background.paper' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
          mb={{ xs: 4, md: 0 }}
        >
          <Avatar src={user?.path_to_avatar || DefaultAvatar} sx={{ width: 120, height: 120 }} />
          <Typography variant="h1" color="text.primary">
            {user.first_name} {user.last_name}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/profile/edit')}
            sx={{ width: { xs: '90%', sm: 'auto' } }}
          >
            <Typography variant="body2" sx={{ px: 2 }}>
              Редактировать профиль
            </Typography>
          </Button>
        </Box>
        <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
            width="100%"
            gap={{ xs: 4, md: 10 }}
            my={{ xs: 3, md: 7 }}
          >
            <Box width="100%" flex={1}>
              <Typography
                variant="h3"
                textTransform="uppercase"
                component={Link}
                to="/calendar"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Календарь
              </Typography>
              <Typography variant="body2" my={2} sx={{ whiteSpace: 'pre-line' }}>
                {parseGreeting(calendarInfo?.title_third)}
              </Typography>
            </Box>
            <Calendar />
          </Box>
          <Divider />
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            width="100%"
            gap={10}
            my={7}
          >
            <Box sx={{ overflow: 'hidden' }}>
              <Box>
                <Typography variant="h3" textTransform="uppercase" fontWeight="300">
                  Избранное
                </Typography>
              </Box>
              <Box
                mt={2}
                pb={1}
                display="flex"
                gap={5}
                sx={{ overflowX: 'scroll', overflowY: 'hidden' }}
              >
                {isFavoritesFetching ? (
                  <Box>Загрузка...</Box>
                ) : favorites.filter((lesson) => lesson.course_type_slug).length > 0 ? (
                  favorites.map((lesson) => <ProfileLesson lesson={lesson} key={lesson.id} />)
                ) : (
                  <Box>Ничего не добавлено</Box>
                )}
              </Box>
            </Box>
            <Box sx={{ overflow: 'hidden' }}>
              <Box>
                <Typography variant="h3" textTransform="uppercase" fontWeight="300">
                  Просмотренное
                </Typography>
              </Box>
              <Box
                mt={2}
                pb={1}
                display="flex"
                gap={5}
                sx={{ overflowX: 'scroll', overflowY: 'hidden' }}
              >
                {isMyViewFetching ? (
                  <Box>Загрузка...</Box>
                ) : myVieweds.filter((lesson) => lesson.course_type_slug).length > 0 ? (
                  myVieweds.map((lesson) => <ProfileLesson lesson={lesson} key={lesson.id} />)
                ) : (
                  <Box>Ничего не просмотрено</Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
