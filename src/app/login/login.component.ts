import { Component, OnInit } from '@angular/core';
import{HttpService} from '../services/http.service';
import{Router} from '@angular/router';
import{ToasterService} from '../services/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public toast:ToasterService,public router:Router,public service:HttpService) { }

  ngOnInit() {
  }

  email='';
  password='';

  login(){
    if(!/\w+\@\w+\.\w+/.test(this.email)){      
      this.toast.warningcustomhead("Enter Proper email","User Login");
    }else if(!this.password || this.password.length<6){      
      this.toast.warningcustomhead("Password should be 6 charater long","User Login");
    }
    else{
      this.service.login(this.email,this.password).subscribe((res:any)=>{
        
        if(res.status==200){
          this.toast.successcustomhead("Loggin Succesfull","User");
          this.service.saveData(res.data);
          this.router.navigate(['./Blog/home'])
        }
      },(err:any)=>{
        if(err.status==401){          
          this.toast.errorfixhead(err.error.message);
        }
        
      })
    }
  }

}
