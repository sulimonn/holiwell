import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography, Box } from '@mui/material';

// project import
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" textAlign="center" textTransform="uppercase">
          Регистрация
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FirebaseRegister />
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
            Уже есть профиль?
          </Typography>{' '}
          <Typography component={Link} to="/login" variant="body2" fontWeight="100" color="primary">
            Войдите здесь
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Register;
