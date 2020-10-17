import { Component, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';
import{Router} from '@angular/router';
import{ToasterService} from '../../services/toaster.service';
@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  constructor(public toast:ToasterService,public router:Router,public service:HttpService) { }

  ngOnInit() {
    this.getAllBlogs();
  }

 Blogs:any=[];
  getAllBlogs(){
    this.service.getAllBlog().subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.Blogs=res.data;
        this.Blogs.forEach((item,index)=>{
          item['comment']='';
          item['commentData']=[];
          this.getComment(item.id,index);
        })
      }
    },(err)=>{
      console.log(err);
    })
  }


  comment='';
  sendComment(data,index){
    console.log(data);
    if(!data.comment || data.comment.length==0){
      this.toast.warningcustomhead("Enter Comment","Comment");
    }else{
      this.service.sendComment({"user_id":this.service.getData().id,"post_id":data.id,"comment":data.comment}).subscribe((res:any)=>{
        if(res.status==200){
          this.toast.successcustomhead(res.message,"Comment");
          data.comment="";
          this.getComment(data.id,index)
        }
      },(err)=>{
        this.toast.errorstatus0();
      })
    }
    
  }



  getComment(postId,Index){

    this.service.getComment(postId).subscribe((res:any)=>{
      if(res.status==200){
        console.log(res);
        this.Blogs[Index].commentData=res.data;
      }
    },(err)=>{
      console.log(err);
    })

  }

  checkUser(data){   
    if(this.service.getData().id==data){      
      return true;
    }else{
      return false;

    }
  }

  deleteComment(commentdata,postData,index){
    const obj = {
      body: {
        id: commentdata.id,           
          },
        };
    this.service.deletecomment(obj).subscribe((res:any)=>{

      if(res.status==200){
        this.toast.successcustomhead(res.message,"Comment");
        this.getComment(postData.id,index);
      }else{
        this.toast.errorcustomhead(res.message,"Delete Comment");
      }
    },(err)=>{
      console.log(err)
      this.toast.errorstatus0();
    })
  }

}
