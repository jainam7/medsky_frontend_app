import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninpagePage } from "../signinpage/signinpage";



export interface Slide {
  title: string;
  description: string;
  image: string;
}

/**
 * Generated class for the Tutorialpage1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorialpage1',
  templateUrl: 'tutorialpage1.html',
})
export class Tutorialpage1Page {
  showSkip:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tutorialpage1Page');
  }
  onTutorialNext(){
    this.navCtrl.push(SigninpagePage);
  }
  startApp()
  {
    
  }

}
