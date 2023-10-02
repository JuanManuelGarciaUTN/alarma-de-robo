import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SelectorComponent } from './selector/selector.component';
import { FormsModule } from '@angular/forms';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@NgModule({
  declarations: [AppComponent, SelectorComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())],
  providers: [
    Flashlight,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
