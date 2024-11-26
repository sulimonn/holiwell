// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { pages } = useSelector((state) => state.menu);
  const navGroups = [
    {
      id: 'pages',
      title: 'Страницы',
      type: 'group',
      children: pages.map((item) => ({ url: item.slug, ...item, type: 'item' })),
    },
    ...menuItem.items,
  ].map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  console.log(navGroups);

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
