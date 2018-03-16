import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController} from 'ionic-angular';
import { UserlogProvider } from "../../providers/userlog/userlog";
import { User_Class } from "../../providers/userlog/user_class";
import { TabsPage } from "../tabs/tabs";
import { email_class } from "../../providers/userlog/email";
/**
 * Generated class for the SignuppagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signuppage',
  templateUrl: 'signuppage.html',
})
export class SignuppagePage {

  email_id:string='';
  password:string='';
  mno:string='';
  userObject:User_Class;
  
  constructor(public toast:ToastController,public navCtrl: NavController, public data:UserlogProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignuppagePage');
  }
  onSignupClick()
  {
   let t1=this.toast.create({
      message:"Signup Successfully.Kindly Go to Sign In Page and Sign In.",
      duration:3000,
      position:"bottom"
    });
    let t2=this.toast.create({
      message:"Enter Email Id",
      duration:3000,
      position:"bottom"
    });
    let t3=this.toast.create({
      message:"Enter Password",
      duration:3000,
      position:"bottom"
    });
    let t4=this.toast.create({
      message:"Enter Mobile No",
      duration:3000,
      position:"bottom"
    });
    if(this.email_id=='')
    {
     t2.present();
     this.navCtrl.push(SignuppagePage);
    }
    else if(this.password=='')
    {
     t3.present();
    }
    else if(this.mno=='')
    {
     t4.present();
    }
    else{

      var message="Respected Sir/Medam ,Congratultaions!!!Greeting from Medsky.You had successfully signed up at Medsky App.Use it wisely.If any feedback do us inform on medskyy@gmail.com.";
      this.data.sendemail(new email_class(message,this.email_id,"Scala from Medsky.com")).subscribe(
        (data1:any)=>{
          console.log("mail sent");
          this.data.addUser(new User_Class(0,this.email_id,'',this.mno,this.password,'','',0,'',''))
   .subscribe(

     (data:User_Class[])=>{
     },
     function(error){
      console.log(error);
    },
    function(){
     
    }
   );
          //alert("The Password has been sent to "+this.email_id);
          t1.present();
          //this.navCtrl.push(TabsPage);
        },function(error){
          let t1=this.toast.create({
            message:"Enter Valid Email Address.",
            duration:3000,
            position:"bottom"
          });
         t1.present();
        },function(){}
        
      );
  
      
    
    }
    
  }


}
