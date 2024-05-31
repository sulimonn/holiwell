import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar } from '@mui/material';
import DefaultAvatar from 'assets/images/users/default.png';
import { useAuth } from 'contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Box width="100%">
      <Box
        height={{ xs: 'auto', md: 350, lg: '400px' }}
        bgcolor="background.paper"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Avatar src={user.path_to_avatar || DefaultAvatar} sx={{ width: 120, height: 120 }} />
        <Typography variant="h1" color="text.primary">
          {user.first_name} {user.last_name}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/profile/edit')}>
          <Typography variant="body2" sx={{ px: 2 }}>
            Редактировать профиль
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
