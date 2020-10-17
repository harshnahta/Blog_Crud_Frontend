import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  loading=false;
  constructor(private http:HttpClient,public router:Router) { }

  userurl="http://localhost:9003/user/";


  saveToken(token){
    localStorage.setItem("token",token);
  }

  gettoken(){
    return localStorage.getItem("token");
  }

  saveData(data){
    localStorage.setItem("data",JSON.stringify(data));
  }

  getData(){
    return JSON.parse(localStorage.getItem("data"));
  }

  checkImgErr(data){
  data.images="../../../assets/no_img.png";
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['./login']);
  }

  login(email,password){
    return this.http.post(this.userurl+'login',{"email":email,"password":password});
  }


  register(data){
    return this.http.post(this.userurl+'register',data);
  }


  postBlog(data){
    return this.http.post(this.userurl+"postBlog",data);
  }

  updateBlog(data){
    return this.http.put(this.userurl+"updateBlog",data);
  }

  deleteBlog(objId){
    return this.http.delete(this.userurl+'deleteBlog',objId);
  }




  getUserBlog(){
    let params:HttpParams=new HttpParams().set("id",this.getData().id);
    return this.http.get(this.userurl+'getUserBlog',{params:params});
  }

  getAllBlog(){    
    return this.http.get(this.userurl+'getAllBlogs');
  }


  sendComment(obj){
    return this.http.post(this.userurl+'sendComment',obj);
  }

  getComment(postId){
    let params:HttpParams=new HttpParams().set("post_id",postId);
    return this.http.get(this.userurl+'getComment',{params:params});
  }

  deletecomment(obj){
    return this.http.delete(this.userurl+'deleteComment',obj);
  }

}
