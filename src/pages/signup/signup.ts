import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  username = '';
  password = '';

  constructor(private authService: AuthService, public navCtrl: NavController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  onSignUp(){
    
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });    
    loading.present();      

    this.authService.signup(this.username, this.password)       
      .then(
        data => {
          loading.dismiss()
          this.navCtrl.setRoot(HomePage);
        }
      ) // successfully create new user
      .catch(
        error => {
          loading.dismiss();
        // display error in a alert
          const alert = this.alertCtrl.create({
            title: 'Signup failed',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();          
          
        } // potential errors
      ); // result is a promise  
       
      
  }   

}
