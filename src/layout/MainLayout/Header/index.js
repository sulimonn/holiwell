import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// project import
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  // common header
  const mainHeader = (
    <Toolbar sx={{ backgroundColor: 'transparent', p: 0 }}>
      <Container maxWidth="lg">
        {matchDownMD ? (
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            color="secondary"
            sx={{
              color: 'primary.main',
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : (
          <HeaderContent />
        )}
      </Container>
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    color: 'inherit',
    position: 'absolute',
    elevation: 0,
    sx: {
      top: 0,
      backgroundColor: { xs: 'transparent !important', md: theme.palette.background.paper },
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return <AppBar {...appBar}>{mainHeader}</AppBar>;
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
