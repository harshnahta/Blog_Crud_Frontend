import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HashLocationStrategy ,LocationStrategy } from '@angular/common';
import{InterceptorService} from './interceptor.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { ToastrModule } from 'ngx-toastr';

import{BlogModule} from './Blog/blog-r.module';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,    
    LayoutComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,BlogModule,ToastrModule.forRoot(),
    AppRoutingModule,HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [
    { provide : LocationStrategy, useClass : HashLocationStrategy,},
    { provide : HTTP_INTERCEPTORS,useClass : InterceptorService,multi : true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
