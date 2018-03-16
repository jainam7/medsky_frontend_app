import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,App } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { UserlogProvider } from "../../providers/userlog/userlog";
import { User_Class } from "../../providers/userlog/user_class";
import { AboutPage } from '../about/about';
import { ChangepassPage } from "../changepass/changepass";
import { SigninpagePage } from '../signinpage/signinpage';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user:string='';
  usr:User_Class[]=[];
  pass:string='';
  name:string='';
  mno:string;
  gen:string='';
  

  constructor(public app:App,public navCtrl: NavController,public toast:ToastController ,public navParams: NavParams,public storage:Storage,public udata:UserlogProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.storage.get('id').then((val)=>{
    this.user=val;
    this.udata.getUserid(this.user).subscribe(
      (data:User_Class[])=>{
        this.usr=data;
        this.pass=this.usr[0].usr_pass;
        this.name=this.usr[0].usr_name;
        this.mno=this.usr[0].usr_mno;
        this.gen=this.usr[0].usr_gen;
      },
      function(err){},
      function(){}
    );
    });       
   

  }
  onChangePassClick()
  {
    this.navCtrl.push(ChangepassPage);
  }
  onEditClick()
  {
    let t1=this.toast.create({
      message:"Profile Updated",
      duration:3000,
      position:"bottom"
    });
   
    this.udata.updateUser(new User_Class(0,this.user,this.name,this.mno,this.pass,this.gen,"",0,"","")).subscribe(
      (data:User_Class[])=>{
       // alert("done");
       t1.present();
        console.log(data);
      },
      function(err){},
      function(){}
    );
  }
  logoutuser()
  {
    
    
    const root=this.app.getRootNav();
    root.popToRoot();
   // this.navCtrl.push(SigninpagePage);
    //this.navCtrl.push(SigninpagePage); 
  }

}
