import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:[BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,IonicStorageModule.forRoot({driverOrder:[CordovaSQLiteDriver._driver, Drivers.IndexedDB]})],
  providers: [SocialSharing, InAppBrowser,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
