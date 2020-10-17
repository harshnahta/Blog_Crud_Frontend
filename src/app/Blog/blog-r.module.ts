import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddblogComponent } from './addblog/addblog.component';
import{BlogHomeComponent} from './blog-home/blog-home.component';

import { BlogRoutingModule } from './blog-r-routing.module';



@NgModule({
  declarations: [
    AddblogComponent,
    BlogHomeComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,    
    FormsModule,ReactiveFormsModule,    
  ]
})
export class BlogModule { }
