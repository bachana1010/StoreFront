import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from '././guard/auth.guard';

// import { Page404Component } from './views/pages/page404/page404.component';
// import { Page500Component } from './views/pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
  
      {
        path: 'user',
        loadChildren: () =>
          import('./myModule/user-user/user-user.module').then((m) => m.UserUserModule)
      },


      {
        path: 'branch',
        loadChildren: () =>
        import('./myModule/branch/branch.module').then((m) => m.BranchModule)
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./myModule/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'manager',
        loadChildren: () =>
          import('./myModule/manager/manager.module').then((m) => m.ManagerModule)
      },
    ]
  },

  {
    path: 'signin',
    loadChildren: () =>
    import('./myModule/login/login.module').then((m) => m.LoginModule)
},


  {
    path: 'signup',
    loadChildren: () =>
    import('./myModule/registration/registration.module').then((m) => m.RegistrationModule)
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
