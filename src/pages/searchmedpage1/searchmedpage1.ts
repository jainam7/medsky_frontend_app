import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Content } from 'ionic-angular';
import { medicine } from "../searchdocandmed1/classmedicines";
import { SearchproProvider } from "../../providers/searchpro/searchpro"
import { medicinedetails } from "./classmedicine";

/**
 * Generated class for the Searchmedpage1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchmedpage1',
  templateUrl: 'searchmedpage1.html',
})
export class Searchmedpage1Page {
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public _db:SearchproProvider,public loadingcontroller:LoadingController) {
  }
  medi:String="Basic Details";
  
  med:String;
  medicinedetail:medicinedetails;
  ionViewDidLoad() {
    this.med=this.navParams.get('param1');
    console.log('ionViewDidLoad Searchmedpage1Page');
    let loadingdata=this.loadingcontroller.create({
      content:"Fetching Medicine Details"
    });
    loadingdata.present();
    this._db.id=this.med;
    this._db.searchMed().subscribe(
      (data:medicinedetails[])=>{
        console.log(data);
      for(let item of data){
        this.medicinedetail=item;
      }
      }
        ,
        function(error){
          console.log("error"+error)
        },
        function(){
          console.log("success");
          loadingdata.dismiss();
          
        }
      
    );
  }

}
