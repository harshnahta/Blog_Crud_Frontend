import { Component, OnInit } from '@angular/core';
import{HttpService} from '../services/http.service';
import{ToasterService} from '../services/toaster.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public toast:ToasterService,public service:HttpService) { }

  ngOnInit() {
  }

  previewimg:any="../../../assets/pic.svg";    
  preview(event)
{  
  let FileInput = event.target;
  let file = event.target.files[0];
  if(file.type=='image/png' ||file.type=='image/jpg' || file.type=='image/jpeg'){
    var reader = new FileReader();    
    reader.readAsDataURL(file); 
    reader.onload = (_event) => {       
        this.previewimg = reader.result;         
        this.images=file;                        
    }          
  }else{
    alert("Only Images are allowed");
    this.images='';
    this.previewimg="../../../assets/pic.svg";
  }
 
}

reset(){
  this.images='';
  this.name='';
  this.email='';
  this.mobile='';
  this.password='';
  this.previewimg="../../../assets/pic.svg";
}

  images:any='';
  name='';
  email='';
  mobile='';
  password='';
  register(){
    if(!this.name){      
      this.toast.warningcustomhead("Enter Name","Register");
    }else if(!/\w+\@\w+\.\w+/.test(this.email)){    
      this.toast.warningcustomhead("Enter Proper Email","Register");
    }else if(!this.mobile || this.mobile.length<10){      
      this.toast.warningcustomhead("Mobile Number should be 10 digit","Register");
    }else if(!this.password || this.password.length<6){      
      this.toast.warningcustomhead("Password Should be 6 chaarter long","Register");
    }else{
        let form=new FormData();
        form.append("name",this.name);
        form.append("email",this.email);
        form.append("mobile",this.mobile);
        form.append("password",this.password);
        form.append("img",this.images);
        this.service.register(form).subscribe((res:any)=>{
          
          if(res.status==200){
            this.reset();            
          this.toast.successcustomhead("Register Succesfull... Please Login","User Register");
          }
        },(err:any)=>{
          
          if(err.status==409){            
            this.toast.errorfixhead(err.error.message);
          }
        })
    }
  }

}
