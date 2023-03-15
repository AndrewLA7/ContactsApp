import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: 'contacts',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'login', 
    loadChildren: () => import('../app/login-page/login.module').then(m => m.LoginModule)
  },
  {
    path: 'details', 
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/detailed-info/detailed.module').then(m => m.DetailedModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
