import { Injectable } from '@angular/core';
import { filter, first, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  doc, docData, Firestore, setDoc,serverTimestamp } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../clases/usuario';
import {
	Auth,
  getAuth, 
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
  UserCredential
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


constructor(private afAuth: Auth, private firestore: Firestore,private afs: AngularFirestore) {
 
}

async login(email: string, password: string) {

  try {
    const user = await signInWithEmailAndPassword(this.afAuth, email, password);
    return user;
 } catch (error) {
     console.log("servicio" + error);
     return null;
   }

}


async registro(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    this.updateUserData(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async logout() {
  try {
    await this.afAuth.signOut();
  } catch (error) {
    console.log(error);
  }

}
getUsuario() {
  const user = this.afAuth.currentUser;
      //const userDocRef = doc(this.firestore, `users/${user!.uid}`);
  return this.afs.collection('user').valueChanges({ idField: user?.uid }) as Observable<User[]>;

     //  return docData(userDocRef, { idField: 'id' });

}

getUsuarioFire() {
  const user = this.afAuth.currentUser;

       return user;

}

private async updateUserData(user: any) {
  const userRef = doc(this.firestore, `users/${user.uid}`);
  const data: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    myCustomData: "lola"
  };
  await setDoc(userRef, {
    data
  });
  return true;
}

async updateLogUser(email: string) {
  const user = this.afAuth.currentUser;
    try {
      await setDoc(doc(this.firestore, 'userlog'), {
        email: email,
        fechaIngreso: serverTimestamp()
      });

      return true;
    } catch (error) {
      return error;
    }
  
}

}
