import { DateTime } from "ionic-angular/components/datetime/datetime";

export class User_Class{
    
    constructor(public usr_sr_no:number,public pk_usr_email_id:string,public usr_name:string,public usr_mno:string,public usr_pass:string,public usr_gen:string,public usr_pro_pic:string,public blood_grp:string,public usr_bdate:DateTime,public usr_verify:number,public usr_token:string,public usr_type:string)
    {

    }
}
