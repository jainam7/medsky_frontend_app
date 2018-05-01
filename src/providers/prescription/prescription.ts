//`import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { prescription  } from "../../pages/home/classprescription";
import { Http,Response} from "@angular/http";
//import { Observable } from "rxjs/Observable";
//below code is new for passing two params in querystring
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from "@ionic/storage";
import "rxjs/rx";
/*
  Generated class for the PrescriptionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrescriptionProvider {
  // private url="http://localhost:3000/prescription/";
  // private url2="http://localhost:3000/prescription2/"
  // private url3="http://localhost:3000/med/"
   private url="https://medsky-backend.herokuapp.com/prescription/";
   private url2="https://medsky-backend.herokuapp.com/prescription2/";
   private url3="https://medsky-backend.herokuapp.com/med/";
 
  uid:String="";
  did:String="";
  pid:Number=0;
  mid:any;

  querystring:String="";

  constructor(public _http:Http,public storage:Storage) {
    console.log('Hello PrescriptionProvider Provider');
    this.uid=localStorage.getItem('id');
    // this.storage.get('id').then((val)=>{
    //       this.uid=val;      
    //   });
  }
 // private presc:prescription[]=[];
  
  getPrescription()
  {
    return this._http.get(this.url+this.uid).map((response:Response)=>response.json());
  }
  getmedicinename()
  {
     return this._http.get(this.url3+this.mid).map((response:Response)=>response.json());
  }
  getWholePrescription()
  {
    return this._http.get(this.url2+this.pid).map((response:Response)=>response.json());
  }
  getPrescriptionDate(did)
  {  
    return this._http.get(this.url2+(this.uid+"/"+did)).map((response:Response)=>response.json());
  }
}
