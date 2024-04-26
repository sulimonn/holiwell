import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import AuthCard from './AuthCard';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box
    flex={1}
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    py={{ xs: 10, sm: 5, md: 0 }}
    px={{ xs: 3, sm: 0 }}
  >
    <AuthCard>{children}</AuthCard>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
