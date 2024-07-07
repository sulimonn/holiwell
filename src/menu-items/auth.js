// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const auth = {
  id: 'auth',
  title: '',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'ВОЙТИ',
      type: 'item',
      url: '/login',
      mobile: false,
      isAuth: false,
    },
    {
      id: 'logout1',
      title: 'ВЫЙТИ',
      type: 'item',
      url: '/logout',
      mobile: false,
      isAuth: true,
    },
  ],
};

export default auth;
