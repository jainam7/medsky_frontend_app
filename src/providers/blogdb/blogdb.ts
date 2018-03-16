import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blog } from '../../pages/about/blog';
/*
  Generated class for the BlogdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlogdbProvider {
  url:string = "http://localhost:3000/blog/";
  url2:string = "http://localhost:3000/blog_likes/";
  url3:string = "http://localhost:3000/likeEmail/";
  blogid:Number;
  constructor(public http: HttpClient) {
    console.log('Hello BlogdbProvider Provider');
  }
  getAllBlogs(){
    return this.http.get(this.url);
  }
  getBlogById()
  {
    return this.http.get(this.url+this.blogid);
  }

  getLikeEmail(id,email){
    return this.http.get(this.url3+id+'/'+email);
  }

  getblogLikes(id){
    return this.http.get(this.url2+id);
  }

  addLikes(item){
    let body= JSON.stringify(item);
    return this.http.post(this.url2,body,{headers: new HttpHeaders().set('Content-Type','application/json')});
  }

  deleteLikes(id,email)
  {
    return this.http.delete(this.url2+id+'/'+email,{headers: new HttpHeaders().set('Content-Type','application/json')});
  }
}
