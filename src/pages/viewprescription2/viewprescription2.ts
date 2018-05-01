import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { PrescriptionProvider } from "../../providers/prescription/prescription";
import { prescdata } from "./classprescriptiondate";
import { Viewprescription3Page } from "../viewprescription3/viewprescription3";
/**
 * Generated class for the Viewprescription2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewprescription2',
  templateUrl: 'viewprescription2.html',
})
export class Viewprescription2Page {

  allprescdate:prescdata[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingcontroller:LoadingController,public _dbprescription:PrescriptionProvider) {

  }
 doc_id:string;
 
 //uid:string="malav@gmail.com";
//  uid:string;
//  this.uid=localStorage.getItem('id');
datearray:Date;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Viewprescription2Page');
    this.doc_id=this.navParams.get('param1');
    //alert(this.doc_id);
    let loadingdata=this.loadingcontroller.create({
      content:"Fetching your prescriptions"
    });
    loadingdata.present();
   
    this._dbprescription. getPrescriptionDate(this.doc_id).subscribe(
      (data:prescdata[])=>{
        this.allprescdate=data;
        console.log(data);
      },
      function(error){
        console.log("error"+error)
      },
      function()
      {
        console.log("Success");
        loadingdata.dismiss()
      }
    );
  }
  onViewPrescription(item){
    this.navCtrl.push(Viewprescription3Page,{
      param1:item.pk_pres_id
    });
  }

}
