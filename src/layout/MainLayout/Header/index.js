import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, Container } from '@mui/material';

// project import
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  // common header
  const mainHeader = (
    <Toolbar sx={{ backgroundColor: 'transparent', p: 0 }}>
      <Container maxWidth="lg">{!matchDownMD && <HeaderContent />}</Container>
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    color: 'inherit',
    elevation: 0,
    sx: {
      position: { xs: 'absolute', md: 'relative' },
      top: 0,
      backgroundColor: { xs: 'transparent !important', md: theme.palette.background.paper },
      boxShadow: { xs: 'none', md: '0 -1px 10px 6px rgba(0, 0, 0, 0.12)' },
      display: {
        xs: 'none',
        md: 'flex',
      },
    },
  };

  return <AppBar {...appBar}>{mainHeader}</AppBar>;
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
