import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component';

import{LayoutComponent} from './layout/layout.component';

import{LoginguardGuard} from './guards/loginguard.guard';
import{HomeguardGuard} from './guards/homeguard.guard';
// canActivate:[LoginauthGuard],
const routes: Routes = [
  { path : '', redirectTo:'login',pathMatch:'full'},
  { path : 'login',canActivate:[LoginguardGuard], component: LoginComponent },
  { path : 'register',canActivate:[LoginguardGuard], component: RegisterComponent },
  {path:'',component:LayoutComponent, children:[
  { path: 'Blog',canActivate:[HomeguardGuard], loadChildren: () => import('./Blog/blog-r.module').then(m => m.BlogModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
