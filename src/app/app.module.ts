import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { UserNavMenuComponent } from "../components/user-nav-menu/user-nav-menu.component";
import { NavProfilePopover } from "../components/popovers/nav-profile-popover";
import { RegisterService } from "../services/register.service";
import { DataVoterInfoService } from "../services/data-voter-info.service";
import { EventFilterService } from "../services/event-filter.service";
import { UserApiService } from "../services/user-api.service";
import { EventsApiService } from "../services/events-api.service";
import { TagsApiService } from "../services/tags-api.service";
import { TokenManagerService } from "../services/token-manager.service";
import { UserLoginPage } from '../pages/user-login/user-login';
import { UserRegisterAboutPage } from "../pages/user-register-about/user-register-about";
import { UserRegisterAuthInfoPage } from "../pages/user-register-auth-info/user-register-auth-info";
import { UserRegisterDistrictPage } from "../pages/user-register-district/user-register-district";
import { UserRegisterFinalPage } from"../pages/user-register-final/user-register-final";
import { UserRegisterInterestsPage } from "../pages/user-register-interests/user-register-interests";
import { UserRegisterTypePage } from "../pages/user-register-type/user-register-type";
import { EventsAllPage } from "../pages/events-all/events-all";
import { HomePage } from "../pages/home/home";
import { UserSettingsPage } from "../pages/user-settings/user-settings";
import { OrgInviteRequestPage } from "../pages/org-invite-request/org-invite-request";
import { OrgPostEventPage } from "../pages/org-post-event/org-post-event";
import { EventsSelectedPage } from "../pages/events-selected/events-selected";
import { DatePicker } from '@ionic-native/date-picker';
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    UserNavMenuComponent,
    NavProfilePopover,
    UserLoginPage,
    UserRegisterAboutPage,
    UserRegisterAuthInfoPage,
    UserRegisterDistrictPage,
    UserRegisterFinalPage,
    UserRegisterInterestsPage,
    UserRegisterTypePage,
    EventsAllPage,
    HomePage,
    UserSettingsPage,
    OrgInviteRequestPage,
    OrgPostEventPage,
    EventsSelectedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavProfilePopover,
    UserLoginPage,
    UserRegisterAboutPage,
    UserRegisterAuthInfoPage,
    UserRegisterDistrictPage,
    UserRegisterFinalPage,
    UserRegisterInterestsPage,
    UserRegisterTypePage,
    EventsAllPage,
    HomePage,
    UserSettingsPage,
    OrgInviteRequestPage,
    OrgPostEventPage,
    EventsSelectedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterService,
    DataVoterInfoService,
    EventFilterService,
    UserApiService,
    EventsApiService,
    TokenManagerService,
    TagsApiService,
    DatePicker,
    Camera,
    HTTP,
    NativeGeocoder,
    Geolocation
  ]
})
export class AppModule {}
