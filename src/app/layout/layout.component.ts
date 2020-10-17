import { Component, OnInit } from '@angular/core';
import{HttpService} from '../services/http.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public router:Router,public service:HttpService) { }

  ngOnInit() {
  }


  logout(){
    this.service.logout();
  }


  route(text){
    switch(text){
      case 'home':this.router.navigate(['./Blog/home']);break;
      case 'post':this.router.navigate(['./Blog/postBlog']);break;
      case 'default':break;
    }
  }
 

}
