import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Container, Divider } from '@mui/material';
import DefaultAvatar from 'assets/images/users/default.png';
import { useAuth } from 'contexts/AuthContext';
import Calendar from 'pages/calendar/index';
import MobileHeaderContent from 'layout/MainLayout/Header/MobileHeaderContent/index';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <MobileHeaderContent color="black" />
      <Box width="100%" py={{ xs: 6, md: 0 }}>
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
          <Avatar src={user.path_to_avatar || DefaultAvatar} sx={{ width: 120, height: 120 }} />
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
              <Typography variant="h2">Календарь</Typography>
              <Typography variant="body2" my={2}>
                Откройте для себя преимущества регулярной медитации на нашем курсе, направленном на
                улучшение физического и эмоционального благополучия...
              </Typography>
              <Typography variant="body2" component={Link} to="/calendar" color="primary.light">
                Читать дальше
              </Typography>
            </Box>
            <Calendar />
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" width="100%" gap={10} my={7}></Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
