import { INavData } from '@coreui/angular';

export const loggedInNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Administrator'
  },
  {
    name: 'User',
    url: '/user',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Branch',
    url: '/branch',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'GoodsIn',
    url: '/products/goodsin',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'GoodsOut',
    url: '/products/goodsout',
    iconComponent: { name: 'cil-drop' }
  },

  {
    name: 'ProductList',
    url: '/products/list',
    iconComponent: { name: 'cil-drop' }
  },


  {
    name: 'Logout',
    url: '/logout',
    iconComponent: { name: 'cil-star' },
  }
];

export const loggedOutNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Login',
    url: '/signin',
    iconComponent: { name: 'cil-star' },
  },
  {
    name: 'Register',
    url: '/signup',
    iconComponent: { name: 'cil-star' },
  }
];
