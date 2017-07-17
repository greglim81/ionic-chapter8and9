import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NoteService{    
  
  notes;

  constructor(private storage : Storage, private db: AngularFireDatabase){      
  }  

  fetchNotes(userId){   
    return this.db.list('/notes/'+userId);             
  }  

  removeNote(note,userId){
    this.db.object('/notes/'+userId+'/'+note.$key).remove()
      .then( x=> console.log("SUCCESS"))
      .catch( error => {
        alert("Could not delete note.");
        console.log("ERROR", error)
      });
  }

  addNote(note,userId){    
    this.db.list('/notes/'+userId).push({   
        title: note.title,             
        content: note.content,
        date: note.date        
    });        
  } 

  editNote(note,userId){
    this.db.object('/notes/'+userId+'/'+note.$key).update({
        title: note.title,             
        content: note.content,
        date: note.date        
    });                
  }  
}