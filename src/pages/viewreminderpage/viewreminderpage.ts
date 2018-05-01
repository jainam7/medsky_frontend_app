import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Calendar } from "@ionic-native/calendar";
import { Platform } from 'ionic-angular/platform/platform';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AddremiderpagePage } from "../addremiderpage/addremiderpage";
import { ReminderproviderProvider } from "../../providers/reminderprovider/reminderprovider";
import { reminder } from "./classreminder";
@IonicPage()
@Component({
  selector: 'page-viewreminderpage',
  templateUrl: 'viewreminderpage.html',
})
export class ViewreminderpagePage {
  reminderarray:reminder[]=[];
  temp1:string;
  temp2:string;
  uid:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private calendar:Calendar,
    private plt:Platform,
    public modalCtrl:ModalController,
    public _db:ReminderproviderProvider,
    public toast:ToastController) {
  }

  endDate=Date();
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewreminderpagePage');
    this.uid=localStorage.getItem('id');
    let t1=this.toast.create({
      message:"Pull Down to Refresh Content",
      duration:5000,
      position:"bottom"
    });
    t1.present();
    this._db.getReminders(this.uid).subscribe((data:reminder[])=>{
      this.reminderarray=data;
      console.log(data);
   },
   function(error){
     console.log(error);
   },
   function(){
     console.log("success");
   }
    );
  
  }
  
  doRefresh(refresher){
   
    this._db.getReminders(this.uid).subscribe((data:reminder[])=>{
      this.reminderarray=data;
      console.log(data);
   },
   function(error){
     console.log(error);
   },
   function(){
     console.log("success");
   }
    );
   
    refresher.complete();

  }
  addEvent()
  {
    let modal=this.modalCtrl.create(AddremiderpagePage);
    modal.present();
    modal.onDidDismiss(()=>{
        this.ionViewDidLoad();
    });
  // let date=new Date();
    
    
/*    this.calendar.createEventInteractivelyWithOptions('My New Event','Munster','Some Special Notes',date,date).then(()=>{
    
    });
*/
/*let startDate=new Date();
let endDate=new Date(this.endDate);
*/

  /*  this.calendar.createEvent("Trial Event","Ahmedabad","Take Medicines from Medsky",startDate,endDate).then(()=>{
      
            });*/
  }
  deleterem(item:reminder)
  {
    let date1=new Date(item.start_date);
    let date2=new Date(item.end_date);
    
    this.calendar.deleteEvent(item.rem_title,"",item.rem_desc,date1,date2)
    .then(result=>{console.log(result+"Reminder Deleted from Calender Successfully!!!");
    this._db.deleteReminder(item.pk_rem_id).subscribe((date)=>{
      alert("Reminder Deleted Successfully!!!");
      this.ionViewDidLoad();
    },
    function(error){
      console.log(error);
    },
    function(){
      console.log("success");
    }
     );
  
  });
  }
}
