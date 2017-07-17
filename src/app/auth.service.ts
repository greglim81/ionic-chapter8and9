import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService{    

  constructor(private afAuth: AngularFireAuth){      
  }    

    signIn(username: string, password: string){ 
        return this.afAuth.auth.signInWithEmailAndPassword(username,password);         
    }  

    signup(username: string, password: string){ // sign up method will receive the email and password entered
        return this.afAuth.auth.createUserWithEmailAndPassword(username,password);
        /*
            .then(authState => {
            console.log("signup-then",authState);
            authState.auth.sendEmailVerification(); //firebase takes of this
            // but how to customize email that is sent to user?
            // go to Authentication, Email templates
        })
        .catch(error => {
            console.log("signup-error",error)            
        }); // in case of error while sign up a new user        
        */
    }

    getCurrentUser(){       
        return this.afAuth.authState;        
    }    

    logout(){
        this.afAuth.auth.signOut();        
    }        
}


/**
 * 
 *             {
            email: username,
            password: password
        },{
            method: AuthMethods.Password, // ??
            provider: AuthProviders.Password // ??
        });
 * 
 */