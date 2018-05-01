import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UserPage } from "../user/user";
import { UserlogProvider } from "../../providers/userlog/userlog";
import { User_Class } from "../../providers/userlog/user_class";
import { TabsPage } from "../../pages/tabs/tabs";
import { Storage } from "@ionic/storage";
import { User_Class2 } from "../../providers/userlog/use_class2";
/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {
  user:User_Class[]=[];
  pass:string='';
  email_id:string='';
  npass:string='';
  cpass:string='';
  x:User_Class[]=[];
  opass:string='';
  u:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public _db:UserlogProvider,public toast:ToastController) {
    this.email_id=localStorage.getItem('id');
    // this.storage.get('id').then((val)=>{
    //   this.email_id=val;  
    // }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }
  
  onChangePassClick()
  {
   
    this.pass=localStorage.getItem('pass');
    // this.storage.get('pass').then((val)=>{
    //   this.pass=val;  
    // }); 
    if(this.npass==this.cpass)
    {
      if(this.npass==this.cpass)
      {
       this._db.changepass(new User_Class2(this.npass,this.email_id)).subscribe(
         (data:User_Class[])=>{
           this.user=data;
           let t3=this.toast.create({
            message:"Password Successfully Changed",
            duration:3000,
            position:"bottom"
        
          });
          t3.present();
      } ,
      function(error){
        console.log(error);
      },
      function(){
        //l1.dismissAll();
      }
    );
    }
    else
    {
     let t3=this.toast.create({
       message:"New Password doesnot match with confirm password.Both Should be same.",
       duration:3000,
       position:"bottom"
   
     });
      t3.present();
    }
   }
   else
   {
     let t3=this.toast.create({
       message:"Old Password do not march.Please enter correct password.",
       duration:3000,
       position:"bottom"
   
     });
     t3.present();
   }
  }

}
