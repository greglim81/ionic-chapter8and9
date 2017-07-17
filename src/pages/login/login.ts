import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../app/auth.service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username = '';
  password = '';  

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, 
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  signIn(){
    console.log(this.username + ' ' + this.password);        
    
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });    
    loading.present();    
    
    this.authService.signIn(this.username,this.password)
      .then(authState => {   
          loading.dismiss();
          console.log("Login-then",authState);          
          this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
          console.log("login-error", error);          
          loading.dismiss();                           
          const alert = this.alertCtrl.create({
            title: 'Signin failed.',
            message: error.message,
            buttons:['Ok']
          });
          alert.present();                                 
      }) // e.g. invalid password    
  }

  signUp(){
    this.navCtrl.setRoot('Signup');
  }
  
}

       
/*
function(error) {
          console.log("login-error", error);          
          loading.dismiss();   
                                 
          const alert = this.alertCtrl.create({
            title: 'Signin failed.',
            message: error.message,
            buttons:['Ok']
          });
          alert.present();  
          *
      }); 
      */