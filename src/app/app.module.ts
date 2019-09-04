import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {CompleteInformationPageModule} from './modal/complete-information/complete-information.module';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {Subject} from 'rxjs';
import { AppPasswordDirective } from './app-password.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TipoAuditoriaPipe } from './pipe/tipo-auditoria.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


@NgModule({
  declarations: [AppComponent, AppPasswordDirective],
  entryComponents: [],
  imports: [
    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CompleteInformationPageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCMF0SQm_0ehRpZv8p1OOGYBAMbI0NPAWU'
    }),
    
  ],

  providers: [
   {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    //NativeGeocoder,
   // Geolocation,
    SQLite,
    SQLitePorter,
    StatusBar,
    SplashScreen,
    Camera,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
