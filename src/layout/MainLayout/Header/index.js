import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery } from '@mui/material';

// project import
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.up('xs'));

  // common header
  const mainHeader = (
    <Toolbar sx={{ backgroundColor: 'transparent', p: 0 }}>
      {matchDownMD && <HeaderContent />}
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    color: 'inherit',
    elevation: 0,
    sx: {
      position: { xs: 'absolute', sm: 'fixed' },
      top: 0,
      p: 0,
      backgroundColor: { xs: 'transparent !important', sm: theme.palette.background.paper },
      boxShadow: { xs: 'none', sm: '0 -1px 10px 6px rgba(0, 0, 0, 0.12)' },
      display: {
        xs: 'none',
        sm: 'flex',
      },
      '& .MuiToolbar-root': {
        p: 0,
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
