// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: '',
  type: 'group',
  children: [
    {
      id: 'training1',
      title: 'Тренируйся',
      type: 'item',
      url: '/training',
      mobile: false,
    },
    {
      id: 'listening1',
      title: 'СЛУШАЙ',
      type: 'item',
      url: '/lessons',
      mobile: false,
    },
    {
      id: 'meditation1',
      title: 'МЕДИТИРУЙ',
      type: 'item',
      url: '/meditation',
      mobile: false,
    },
  ],
};

export default pages;
