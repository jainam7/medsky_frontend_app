import { Storage } from "@ionic/storage";
import { Component } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
//import { ToastController, NavController } from 'ionic-angular';

import { NavController,ToastController } from 'ionic-angular';

import { BlogdbProvider } from "../../providers/blogdb/blogdb";
import { SocialSharing } from "@ionic-native/social-sharing";
import { blog } from "./blog";

import { like } from "./like";

import { DatePipe } from '@angular/common';


import { BlogdescriptionPage} from "../blogdescription/blogdescription";



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  bg: blog[];
  lk: like;
  l1: like[] = [];
  textlimit:50;
  truncating:true;

  
  //  j: number = 0;
  public email: string;
  //like:number=0;

  constructor(public storage: Storage, public navCtrl: NavController, public toast: ToastController, public bgdata: BlogdbProvider, public socialsharing: SocialSharing) {
   
  }
   doRefresh(refresher){
    
    
    
      this.bgdata.getAllBlogs().subscribe(
        (data:blog[])=>{
          this.bg=data;
        }
      );
    
     refresher.complete();
 
   }
  ionViewDidLoad() {
  
  
  
  this.email=localStorage.getItem('id');
  
    // this.storage.get('id').then((val) => {
    //     this.email = val;

    let t1=this.toast.create({
      message:"Pull Down to Refresh Content",
      duration:5000,
      position:"bottom"

    });
    this.bgdata.getAllBlogs().subscribe(
      (data: blog[]) => {
        this.bg = data;
        console.log(data);
        for (let i = 0; i < this.bg.length; i++) {
          this.bgdata.getblogLikes(this.bg[i].blog_id).subscribe(
            (data: like[]) => {
              this.bg[i].like_id = data[0].like_id;
              this.bg[i].fk_blog_id = data[0].fk_blog_id;
              this.bg[i].likes = data[0]["SUM(likes)"];
              if (this.bg[i].likes == null) {
                this.bg[i].likes = 0;
              }

              //alert(data[0]["SUM(likes)"]);
              this.bg[i].fk_usr_id = data[0].fk_usr_id;
              
              //this.like=this.bg[i].likes;
            }
          );
        }
      }
    );
    t1.present();

  }
  tapev(e) {
    this.bgdata.getLikeEmail(e.fk_blog_id, this.email).subscribe(
      (data: like[]) => {
        this.l1 = data;
        console.log(data);

        if (this.l1.length == 0) {
          //alert(this.email);
          this.lk = new like(null, e.blog_id, this.email, 1);
          this.bgdata.addLikes(this.lk).subscribe(
            (data: like) => {
              console.log(data);
              this.ionViewDidLoad();
            },
            function (err) { },
            function () { }
          );
        }
        else {
          // alert(this.email);
          this.bgdata.deleteLikes(e.fk_blog_id, this.email).subscribe(
            (data: like) => {
              console.log(data);
              this.ionViewDidLoad();
            }
          );
        }
      }
    );
  }
  menu(item) {
    this.socialsharing.share(item.blog_desc,item.blog_title,null,"www.google.com");
    let t1 = this.toast.create({
      message: ' Shared !!!',
      duration: 1500,
      position: 'bottom'

    });
    t1.present();
  }
  onRead(i:any)
  {
    
    this.navCtrl.push(BlogdescriptionPage,{
      param1:i
    });
  }

}
