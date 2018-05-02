import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiAiClient } from "api-ai-javascript";

import { mes } from "./classmessage";
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatwithbotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatwithbot',
  templateUrl: 'chatwithbot.html',
})
export class ChatwithbotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const client = new ApiAiClient({accessToken:'4596e9d3a1b641db86d96a0ae86e165f'});
    const promise= client.textRequest('Hello!');
     promise.then((response) => {console.log("Response: ",response);})
     .catch((error) => {console.log("Error", error);});
   // this.answers=[];
  }

 // questions=[];
 // answers=[];
 //messages:Observable<mes[]>;
  messages:mes[]=[];
  temp:mes;
  qtext:String;

  
  send(msg:String)
  {
    if(msg!="")
    {
     // this.questions.push(msg);
      this.temp=new mes(msg,"user");
      this.qtext=null;
      this.messages.push(this.temp);
//  sending message to bot

const client = new ApiAiClient({accessToken:'4596e9d3a1b641db86d96a0ae86e165f'});
const promise= client.textRequest(msg);
promise.then(
  res=>{
    const speech=res.result.fulfillment.speech;
    //this.answers.push(speech);
    this.temp=new mes(speech,"bot");
    this.messages.push(this.temp);

  }
).catch((error)=>{console.log(error);});

  

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatwithbotPage');
  }

}
