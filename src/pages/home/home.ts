import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NoteService } from '../../app/note.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes;
  userId;

  constructor(public navCtrl: NavController, private noteService: NoteService, db: AngularFireDatabase, private authService: AuthService) {
    console.log(db);    
  }

  ngOnInit(){
    this.authService.getCurrentUser().subscribe(authState => {              
      this.userId =  authState.uid;
      this.notes = this.noteService.fetchNotes(this.userId);              
    });                                          
  }
 
  onItemClick(note){        
    this.navCtrl. push('Detail',{
      noteParam : note,
      userId : this.userId
    });             
  } 

  onAddClick(){    
    this.navCtrl.push('Detail',{
      userId : this.userId
    }); 
  }

  logout(){
    this.authService.logout();
    this.navCtrl.setRoot('Login');
  }
}
