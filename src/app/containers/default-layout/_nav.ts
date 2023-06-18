import { INavData } from '@coreui/angular';

// Define nav items for each role
export const adminNavItems: INavData[] = [
  { name: 'User', url: '/user', iconComponent: { name: 'cil-drop' } },
  { name: 'Branch', url: '/branch', iconComponent: { name: 'cil-drop' } },
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } },
];

export const operatorNavItems: INavData[] = [
  { name: 'GoodsIn', url: '/products/goodsin', iconComponent: { name: 'cil-drop' } },
  { name: 'GoodsOut', url: '/products/goodsout', iconComponent: { name: 'cil-drop' } },
  { name: 'ProductList', url: '/products/list', iconComponent: { name: 'cil-drop' } },
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } },
];

export const managerNavItems: INavData[] = [
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } },

  
];

export const loggedOutNavItems: INavData[] = [
  {
    name: 'Login',
    url: '/signin',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Register',
    url: '/signup',
    iconComponent: { name: 'cil-star' },
  }
]
