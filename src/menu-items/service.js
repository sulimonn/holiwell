// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const service = {
  id: 'service',
  title: '',
  type: 'group',
  children: [
    {
      id: 'subscription1',
      title: 'Подписка',
      type: 'item',
      url: '/subscription',
      mobile: true,
    },
    {
      id: 'support1',
      title: 'Поддержка',
      type: 'item',
      url: '/support',
      mobile: false,
    },
  ],
};

export default service;
