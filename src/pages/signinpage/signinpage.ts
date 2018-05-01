import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController} from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { UserlogProvider } from "../../providers/userlog/userlog";
import { User_Class } from "../../providers/userlog/user_class";
import { SignuppagePage } from "../signuppage/signuppage";
import { Storage } from "@ionic/storage";
import { email_class } from "../../providers/userlog/email";
import { AboutPage } from '../about/about';
import { ForgetpassPage } from "../forgetpass/forgetpass";
import { VerificationpagePage } from "../verificationpage/verificationpage";

/**
 * Generated class for the SigninpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signinpage',
  templateUrl: 'signinpage.html',
})
export class SigninpagePage {
  email_id:string='';
  password:string='';
  usr:User_Class[];
  mailobj:email_class[]=[];
  msg:string='';
  isverified:number;
  token:string;
  constructor(public storage:Storage,public toast:ToastController,public navCtrl: NavController,public _db:UserlogProvider){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninpagePage');
  }
  // aa code thi home par redirect thavase 
  onSignInNext(){
      /*  let l1=this.load.create({
      content:"Loading...",
      duration:2000
    });
    l1.present();*/
    let t1=this.toast.create({
      message:"Login Successfully",
      duration:3000,
      position:"bottom"
    });
  let t2=this.toast.create({
    message:"Enter Valid Data",
    duration:3000,
    position:"bottom"

  });
  let t3=this.toast.create({
    message:"Enter proper mail id and Password or You had not verified your account",
    duration:3000,
    position:"bottom"

  });
  
    

    /*this._db.Login(new User_Class(0,
      this.email_id,
      '',
      '',
      this.password,
      '',
      '',
      0,
      '',
      ''))*/
      this._db.Login(new User_Class(0,this.email_id,'','',this.password,'','','',null,0,'',''))
    .subscribe(
      (x:User_Class[])=>{
       if(this.email_id=='' || this.password=='')
        {
          t2.present();
        }
        else{
        if(x.length==1){
          this.isverified=x[0].usr_verify;
          this.token=x[0].usr_token;
          
          console.log(this.isverified);
          console.log(this.token);
          
          if(this.isverified==0)
          {
            
            let t1=this.toast.create({
              message:"You had not verified your account.Kindly enter OTP in this page.",
              duration:5000,
              position:"bottom"
            });
            t1.present();
            console.log(this.isverified);
            console.log(this.token);
            this.navCtrl.push(VerificationpagePage,{
              param1:this.email_id,
              param2:this.password,
              param3:this.token
          });
          }
         /* alert('login successfully');
          let l1=this.load.create({
            content:"Loading...",
            duration:3000
  
          });
          l1.present();*/
          else
          {
          t1.present();
          // this.storage.set('id',this.email_id);
          // this.storage.set('pass',this.password);
          localStorage.setItem('id',this.email_id);
          localStorage.setItem('pass',this.password);
          this.navCtrl.push(TabsPage);
          }
        }
        else{
         t3.present();
          this.navCtrl.push(SigninpagePage);
        }
      }

        
         
      },
      function(error){
        console.log(error);
      },
      function(){
        //l1.dismissAll();
      }
    );
}

onClick()
{
  this.navCtrl.push(SignuppagePage);
}

forgotPassword()
{
  

      
    
    //let item=new Users(this.id,this.email,this.name,this.mobno,this.img,this.pass,this.dpass);
  //  alert(this.email);
    // let item=new Users(this.id,this.email,this.name,this.mobno,this.img,this.pass,this.dpass);
    this._db.getUser(this.email_id).subscribe(
      (data:User_Class[])=>{
        if(data.length==1)
        {
          alert("hello");
          var message="Hello "+data[0].usr_name+". You have requested to reset the password. your password is '"+data[0].usr_pass+"'. Password is one of the confidential thing, Don't share it with anyone.";
            this._db.sendemail(new email_class(message,this.email_id,"Resetting the password of Expense Tracker.")).subscribe(
              (data1:any)=>{
                console.log("mail sent");
                alert("The Password has been sent to "+this.email_id);
              },
              
            );
        }
        else
        {
          this.msg="You have entered incorrect email id. Please enter the email id you used to login with.";
        }
      },
      function(err){},
      function(){}
);
  }

onForget()
{
  this.navCtrl.push(ForgetpassPage);
  
    /*let prompt = this.alert.create({
      title: 'Forgot Password',
      message: "Enter Your Email Id To Get Your Password",
      inputs: [
        {
          name: 'name',
          placeholder: 'Email_id'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.email_id = data.name;
            //this.forgotPassword();
          }
        }
      ]
    });
    prompt.present();*/
  }
 

}


