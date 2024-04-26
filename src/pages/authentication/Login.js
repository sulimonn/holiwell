import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography, Box } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" textAlign="center" textTransform="uppercase">
          Войти в профиль
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
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
            Нет профиля?
          </Typography>{' '}
          <Typography
            component={Link}
            to="/register"
            variant="body2"
            fontWeight="100"
            color="primary"
          >
            Зарегистрируйтесь здесь
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
