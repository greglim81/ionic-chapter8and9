import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthService } from './auth.service';
//import { Observable } from 'rxjs/Observable';
//import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Login';

  user;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(authState => {
      if(authState){
        this.rootPage = HomePage;
        console.log("logged in as " + authState.uid);
      } 
      else{
        this.rootPage = 'Login'; 
      }           
    });            
    
        
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

