
import { Injectable } from '@angular/core';

import { Http,Response,Headers} from "@angular/http";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { reminder } from "../../pages/viewreminderpage/classreminder";
import { Storage } from "@ionic/storage";
import "rxjs/rx";


/*
  Generated class for the ReminderproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReminderproviderProvider {
  //private url="http://localhost:3000/rem/";
  private url="https://medsky-backend.herokuapp.com/rem/";
  uid:String="";
  
  constructor(public _http:Http,public http:HttpClient,
              public storage:Storage
  ) {
    console.log('Hello ReminderproviderProvider Provider');
    this.uid=localStorage.getItem('id');
    // this.storage.get('id').then((val)=>{
    //   this.uid=val;
    // });
    
  }

  getReminders()
  {
    return this._http.get(this.url+this.uid).map((response:Response)=>response.json());
  }
  deleteReminder(rem:any)
  {
    return this.http.delete(this.url+rem,{headers: new HttpHeaders().set('Content-Type','application/json')});
  }
  addReminder(rem:reminder)
  { 
    
    let body = JSON.stringify(rem);
    let h = new Headers({ 'Content-Type': 'application/json' });
    let ro = new RequestOptions({ headers: h });
    console.log(rem);
    return this._http.post(this.url,body,ro).map((res:Response)=>res.json());
   
  }

}
