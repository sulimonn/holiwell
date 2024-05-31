import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 430 },
      margin: 0,
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
      backgroundColor: 'background.default',
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
  >
    <Box sx={{ p: 0, mx: 1 }}>{children}</Box>
  </MainCard>
);

AuthCard.propTypes = {
  children: PropTypes.node,
};

export default AuthCard;
