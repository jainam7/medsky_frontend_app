import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { PrescriptionProvider } from "../../providers/prescription/prescription";
import { prescription } from "../home/classprescription";
import { Viewprescription2Page } from "../viewprescription2/viewprescription2";

/**
 * Generated class for the Viewprescription1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewprescription1',
  templateUrl: 'viewprescription1.html',
})
export class Viewprescription1Page {

  allpresc:prescription[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingcontroller:LoadingController,public _dbprescription:PrescriptionProvider,public toast:ToastController) {
  }
  doRefresh(refresher){
   
    
    this._dbprescription.getPrescription().subscribe(
      (data:prescription[])=>{
        this.allpresc=data;
        console.log(data);
      },
      function(error){
        console.log("error"+error)
      },
      function()
      {
        console.log("Success");
       
      }
    );
    refresher.complete();

  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad Viewprescription1Page');
    let t1=this.toast.create({
      message:"Pull Down to Refresh Content",
      duration:5000,
      position:"bottom"
    });
    
    let loadingdata=this.loadingcontroller.create({
      content:"Fetching your prescriptions"
    });
    loadingdata.present();
    
    this._dbprescription.getPrescription().subscribe(
      (data:prescription[])=>{
        this.allpresc=data;
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
    t1.present();
  }
  
  ionViewDidLoad() {
   // this.ionViewWillEnter();
  }
  
  onViewDoctor(item:prescription)
  {
    this.navCtrl.push(Viewprescription2Page,{
      param1:item.fk_doc_email_id
    });
  }
  loadPresc()
  {
    this.ionViewDidLoad();
  }
  share(item)
  {
    
  }

}
