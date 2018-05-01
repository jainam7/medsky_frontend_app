import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { TabsPage } from "../tabs/tabs";
import { UserlogProvider } from "../../providers/userlog/userlog";
import { email_class } from "../../providers/userlog/email";
/**
 * Generated class for the VerificationpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verificationpage',
  templateUrl: 'verificationpage.html',
})
export class VerificationpagePage {
  token:String;
  tk:String;
  email_id:string;
  password:string;
  constructor(public navCtrl: NavController,public data:UserlogProvider,public toast:ToastController,public storage:Storage, public navParams: NavParams) {
    this.email_id=this.navParams.get('param1');
    this.password=this.navParams.get('param2');
    this.tk=this.navParams.get('param3');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationpagePage');
  }
  sendOTP()
  {
    var message="Respected Sir/Medam ,Congratultaions!!!Greeting from Medsky.You had successfully signed up at Medsky App.Use it wisely.Your OTP is  "+this.tk+"  .If any feedback do us inform on medskyy@gmail.com.";
    this.data.sendemail(new email_class(message,this.email_id,"Scala from Medsky.com")).subscribe(
      (data1:any)=>{
        console.log("mail sent");
       
        //alert("The Password has been sent to "+this.email_id);
        let t1=this.toast.create({
          message:"OTP sent to your mail Id.Verify it.",
          duration:3000,
          position:"bottom"
        });
        t1.present();
      
        //this.navCtrl.push(TabsPage);
      },function(error){
        let t1=this.toast.create({
          message:"Enter Valid Email Address.",
          duration:3000,
          position:"bottom"
        });
       t1.present();
      },function(){});
  }
  onVerify(tks:String)
  {
   
    if(this.tk===tks)
    {
      let t1=this.toast.create({
        message:"Signed Up Successfully!! Verified Successfully",
        duration:3000,
        position:"bottom"
      });
      this.data.verifyusr(this.email_id).subscribe(
        (data)=>{
        t1.present();
        localStorage.setItem('id',this.email_id);
        localStorage.setItem('pass',this.password);
        // this.storage.set('id',this.email_id);
        // this.storage.set('pass',this.password);
        this.navCtrl.push(TabsPage);
          console.log(data);
        },
        function(err){},
        function(){}
      );
     
    }
    else
    {
      let t1=this.toast.create({
        message:"Enter Valid Token",
        duration:3000,
        position:"bottom"
      });
      t1.present();
      
    }
  }
}
