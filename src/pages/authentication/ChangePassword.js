import { Link, useLocation } from 'react-router-dom';

// material-ui
import { Grid, Typography, Box, Divider } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import ChangePasswordForm from './auth-forms/ChangePasswordForm';

// ================================|| LOGIN ||================================ //

const ChangePassword = () => {
  const location = useLocation();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center" textTransform="uppercase">
            {location.pathname === '/change-password' ? 'Смена пароля' : 'Восстановление пароля'}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <ChangePasswordForm />
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <Divider>
            <Typography variant="body2" fontWeight="100">
              Или
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} sx={{ my: 1, textAlign: 'center' }}>
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            color="text.secondary"
            textTransform="uppercase"
            textAlign="center"
            sx={{ transition: 'all 0.25s ease', '&:hover': { color: 'primary.main' } }}
          >
            Попробовать войти
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ textDecoration: 'none' }}
              fontWeight="100"
              color="primary"
            >
              Если у вас возникли трудности обратитесь в нашу {''}
              <Typography
                component={Link}
                to="/support"
                variant="body2"
                fontWeight="100"
                color="primary"
              >
                поддержку
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ChangePassword;
