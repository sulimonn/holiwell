// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const platform = {
  id: 'platform',
  title: '',
  type: 'group',
  children: [
    {
      id: 'website',
      title: 'Сайт',
      type: 'item',
      url: 'https://www.ozon.ru/',
      mobile: true,
    },
    {
      id: 'telegram1',
      title: 'Телеграм',
      type: 'item',
      url: '/telegram',
      mobile: false,
    },
  ],
};

export default platform;
