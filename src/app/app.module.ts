import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from "@ionic-native/social-sharing";
import { AboutPage } from '../pages/about/about';
import { UserPage } from "../pages/user/user";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Viewprescription1Page } from '../pages/viewprescription1/viewprescription1';
import { Searchdocandmed1Page } from "../pages/searchdocandmed1/searchdocandmed1";
import { Tutorialpage1Page } from "../pages/tutorialpage1/tutorialpage1";
import { VerificationpagePage } from "../pages/verificationpage/verificationpage";
//import { AuthenticationpagePage } from "../pages/authenticationpage/authenticationpage";
import { SigninpagePage } from "../pages/signinpage/signinpage";
import { SignuppagePage } from "../pages/signuppage/signuppage";
import { Viewprescription2Page } from "../pages/viewprescription2/viewprescription2";
import { Viewprescription3Page } from "../pages/viewprescription3/viewprescription3";
import { Searchdocpage1Page } from '../pages/searchdocpage1/searchdocpage1'
import { Searchmedpage1Page } from "../pages/searchmedpage1/searchmedpage1";
import { ChatwithbotPage } from "../pages/chatwithbot/chatwithbot";
import { BlogdbProvider } from "../providers/blogdb/blogdb";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PrescriptionProvider } from '../providers/prescription/prescription';
import { SearchproProvider } from '../providers/searchpro/searchpro';
import { UserlogProvider } from "../providers/userlog/userlog";
import { ChangepassPage } from '../pages/changepass/changepass';
import { ForgetpassPage } from "../pages/forgetpass/forgetpass";

import { Calendar } from '@ionic-native/calendar';
import { ReminderproviderProvider } from '../providers/reminderprovider/reminderprovider';
import { ViewreminderpagePage } from "../pages/viewreminderpage/viewreminderpage";
import { AddremiderpagePage } from "../pages/addremiderpage/addremiderpage";
import { BlogdescriptionPage } from "../pages/blogdescription/blogdescription";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    Viewprescription1Page,
    Searchdocandmed1Page,
    Tutorialpage1Page,
    SignuppagePage,
    SigninpagePage,
    Viewprescription2Page,
    Viewprescription3Page,
    Searchmedpage1Page,
    Searchdocpage1Page,
    ChangepassPage,
    ForgetpassPage,
    ChatwithbotPage,
    AddremiderpagePage,
    ViewreminderpagePage,
    BlogdescriptionPage,
    VerificationpagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    Viewprescription1Page,
    Searchdocandmed1Page,

    Tutorialpage1Page,
    SigninpagePage,
    SignuppagePage,

    Viewprescription2Page,
    Viewprescription3Page,

    Searchmedpage1Page,
    Searchdocpage1Page,
    ChangepassPage,
    ForgetpassPage,
    ChatwithbotPage,
    ViewreminderpagePage,
    AddremiderpagePage,
    BlogdescriptionPage,
    VerificationpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PrescriptionProvider,
    SearchproProvider,
    UserlogProvider,
    BlogdbProvider,
    SocialSharing,
    Calendar,
    ReminderproviderProvider
  ]
})
export class AppModule {}
