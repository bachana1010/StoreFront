import { INavData } from '@coreui/angular';

export const adminNavItems: INavData[] = [
  { name: 'User', url: '/user', iconComponent: { name: 'cil-drop' } },
  { name: 'Branch', url: '/branch', iconComponent: { name: 'cil-drop' } },
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } },
];

export const operatorNavItems: INavData[] = [
  { name: 'GoodsIn', url: '/products/goodsin', iconComponent: { name: 'cil-drop' } },
  { name: 'GoodsOut', url: '/products/goodsout', iconComponent: { name: 'cil-drop' } },
  { name: 'ProductList', url: '/products', iconComponent: { name: 'cil-drop' } },
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } },
];

export const managerNavItems: INavData[] = [
  { name: 'ProductList', url: '/products', iconComponent: { name: 'cil-drop' } },
  { name: 'goodsin', url: '/manager/goodsIn', iconComponent: { name: 'cil-star' } },
  { name: 'goodsout', url: '/manager/goodsout', iconComponent: { name: 'cil-star' } },
  { name: 'Logout', url: '/signin/logout', iconComponent: { name: 'cil-star' } }




  
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
