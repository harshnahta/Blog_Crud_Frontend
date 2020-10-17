import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import{Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {
  constructor(private service:HttpService,public router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.service.getData()){
        return true;
      }else{
        this.router.navigate(['./Blog/home'])
      }
  }
  
}
