import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddblogComponent } from './addblog/addblog.component';
import{BlogHomeComponent} from './blog-home/blog-home.component';
const routes: Routes = [  
  // { path : 'hms-admin/department', redirectTo:'newdepartment',pathMatch:'full'},
  { path: 'postBlog',component:AddblogComponent},  
  { path: 'home',component:BlogHomeComponent},  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
