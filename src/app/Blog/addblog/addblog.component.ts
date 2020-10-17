import { Component, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';
import{Router} from '@angular/router';
import{ToasterService} from '../../services/toaster.service';
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {

  constructor(public toast:ToasterService,public router:Router,public service:HttpService) { }

  ngOnInit() {  
    this.getUserBlog();  
  }

  BlogData:any=[];
  showEmpty=true;
  getUserBlog(){
    this.service.getUserBlog().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.BlogData=res.data;
        if(this.BlogData.length==0){
          this.showEmpty=true;
        }else{
          this.showEmpty=false;
        }
      }
    },(err)=>{      
      if(err.error && err.error.message){          
        this.toast.errorfixhead(err.error.message);
      }else{
        this.toast.errorstatus0();
      }
    });
  }

  images='';
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


title='';
content='';

reset(){
  this.title='';
  this.content='';
  this.images='';
  this.previewimg="../../../assets/pic.svg";
  this.pText="Post";
}

pText="Post";

postBlog(){
  if(!this.title){
      this.toast.warningcustomhead("Enter Title","Blog Post");
  }else if(this.title.length>99){
    this.toast.warningcustomhead("Title Length Should be less than 100","Blog Post");
  }else if(!this.content){
    this.toast.warningcustomhead("Enter Content","Blog Post");
  }else{
    
    if(this.pText=="Post"){
    var form=new FormData();
    form.append("user_id",this.service.getData().id);
    form.append("title",this.title);
    form.append("content",this.content);
    form.append("img",this.images);
    this.service.postBlog(form).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.toast.successcustomhead(res.message,"Post Blog");
        this.reset();
        this.getUserBlog();
      }
    },(err:any)=>{
      console.log(err);
      if(err.error && err.error.message){          
        this.toast.errorfixhead(err.error.message);
      }else{
        this.toast.errorstatus0();
      }
    })
  }else{
    var form=new FormData();
    form.append("post_id",this.postId);
    form.append("title",this.title);
    form.append("content",this.content);
    form.append("img",this.images);
    this.service.updateBlog(form).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.toast.successcustomhead(res.message,"Update Blog");
        this.reset();
        this.getUserBlog();
      }
    },(err:any)=>{
      console.log(err);
      if(err.error && err.error.message){          
        this.toast.errorfixhead(err.error.message);
      }else{
        this.toast.errorstatus0();
      }
    })
  }
  }
}

postId='';
editBlog(data){
  this.pText="Update";
  console.log(data);
  this.postId=data.id;
  this.title=data.title;
  this.content=data.content;
  this.previewimg=data.images;
  this.images=data.images;
}


deleteBlog(data){  
  const obj = {
    body: {
      postId: data.id,
      images:data.images     
        },
      };
      this.service.deleteBlog(obj).subscribe((res:any)=>{
        console.log(res);
        if(res.status==200){
          this.toast.successcustomhead(res.message,"Delete Blog");
        this.reset();
        this.getUserBlog();
        }
      },(err)=>{
        console.log(err);
        if(err.error && err.error.message){          
          this.toast.errorfixhead(err.error.message);
        }else{
          this.toast.errorstatus0();
        }
      });
}

}
