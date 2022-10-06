import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import "firebase/database";
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../clases/usuario';
import { Router } from '@angular/router';
import { Chat } from '../clases/chat';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //public user$: Observable<firebase.User | null> = this.authSvc.afAuth.user;
  mail: any;
  //user$: Observable<User | null>;

  constructor(private afs: AngularFirestore, private authSvc: AuthService, private router: Router) {
    this.getUseMail();
  
   // this.user$ = this.authSvc.getUsuario()
  }


  addChatMessage(msg: string) {
    this.getUseMail();
    return this.afs.collection('messages').add({
      msg: msg,
      from: this.mail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getChatMessages() {
    let users: any = [];
    this.getUseMail();
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }) as Observable<Chat[]>;
      }),
      map(messages => {
        // Get the real name for each user
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.mail === m.from;
        }
        return messages
      })
    )
  }

  private getUsers() {
    return this.afs.collection('user').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }
  private async getUseMail() {
    if (await this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
     console.log(this.mail);
    } else {
      this.mail = "usuario anonimo";
    }
  }
  private getUserForMsg(msgFromId: any, users: User[]): string {
    //   console.log("users", users);
    this.getUseMail();
    for (let usr of users) {

      if (usr.email == msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }

}
