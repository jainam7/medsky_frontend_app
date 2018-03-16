import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UserlogProvider } from "../../providers/userlog/userlog";
import { User_Class } from "../../providers/userlog/user_class";
import { email_class } from "../../providers/userlog/email";


/**
 * Generated class for the ForgetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public _db:UserlogProvider,public toast:ToastController) {
  }
  email_id:string='';
  password:string='';
  usr:User_Class[];
  mailobj:email_class[]=[];
  msg:string='';
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }
  forgotPassword()
{
  let t1=this.toast.create({
    message:"The Password has been sent to "+this.email_id,
    duration:3000,
    position:"bottom"
  });    
    this._db.getUser(this.email_id).subscribe(
      (data:User_Class[])=>{
       
        if(data.length===1)
        {
          
          var message="Respected Sir/Medam "+data[0].usr_name+". You have requested to reset the password. your password is '"+data[0].usr_pass+"'. Password is one of the confidential thing, Don't share it with anyone.";
            this._db.sendemail(new email_class(message,this.email_id,"Scala from Medsky.com sending your Password")).subscribe(
              (data1:any)=>{
                console.log("mail sent");
                //alert("The Password has been sent to "+this.email_id);
                t1.present();
              },
              
            );
        }
        else
        {
          let t1=this.toast.create({
            message:"Enter valid Email Address.",
            duration:3000,
            position:"bottom"
          });    
         t1.present();
        }
      },
      function(err){},
      function(){}
);
  }
  onClick()
  {
    
    this.forgotPassword();
   
  }


}
