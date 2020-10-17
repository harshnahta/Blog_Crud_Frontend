import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders,HttpResponse, HttpInterceptor,HttpRequest,HttpHandler,HttpSentEvent,HttpHeaderResponse,HttpProgressEvent,HttpUserEvent, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import{tap,retry, retryWhen,mergeMap,take} from 'rxjs/operators';
import {Router} from "@angular/router";
import{HttpService} from './services/http.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {


  constructor(private router:Router,public service:HttpService,){

  }

  // let header:HttpHeaders=new HttpHeaders().set("Connection","keep-alive")
  // .append("Accept-Encoding","gzip, deflate, br")

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    
    return req.clone({
          setHeaders: {
            "authorization"  : this.service.gettoken(),
          
          }
        });    
            
  }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any> | HttpEvent<any>> {
      return next.handle(this.addToken(req)).pipe(retry(1),
        tap((res)=>{
        //  this.service.loader=false;
          if(res instanceof  HttpResponse){               
                
            if(res['headers'].get('tokens') ){ 
              let tokens=res['headers'].get('tokens');     
              if(tokens==="null" || tokens===null){
                // console.log(res['headers'].get('tokens'))   
                // do nothing
              }else{
                this.service.saveToken(res['headers'].get('tokens'))      
              }        
              
            }            
            // if(res.body['refereshedToken']){            
            //   console.log(res.body);
            //   localStorage.setItem("token",res.body['refereshedToken']);            
            // }
          }
          
        },(err)=>{        
          if(err instanceof HttpErrorResponse){  
                  
            if(err.statusText=='Unauthorized' || err.status==401){              
              this.service.logout();
            }
            // else{
  
            // }     
          }       
        })
      )
  }

}
