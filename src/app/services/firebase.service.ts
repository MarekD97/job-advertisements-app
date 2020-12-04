import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogged = false;
  currentUser: any;
  constructor(public fs: AngularFirestore, public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.currentUser = user;
        // console.log(this.currentUser)
      }
    });
  }

  // Sign in existing users
  async signIn(email: string, password: string): Promise<boolean> {
    try {
      if(!email || !password) {
        throw new Error('Invalid email and/or password');
      }
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
      });
      return true;
    } catch (error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  // Sign up new users
  async signUp(email: string, password: string): Promise<any> {
    try {
      if(!email || !password) {
        throw new Error('Invalid email and/or password');
      }
      await this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.auth.onAuthStateChanged((user) => {
          this.currentUser = user;
        });
      });
      console.log('Sign in success');
      return true;
    } catch (error) {
      return error;
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await this.auth.signOut()
      .then(res => {
        this.isLogged = false;
      });
      return true;
    } catch(error) {
      console.log('Sign out failed', error);
      return false;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
      });
    } catch (error) {
      console.log('Login with Google failed', error);
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
      });
    } catch (error) {
      console.log('Login with Facebook failed', error);
    }
  }

  async sendEmailVerification(): Promise<void> {
    await this.currentUser.sendEmailVerification()
    .then(() => {
      console.log('Sent Email Verification. Check the email.');
    });
  }

  getAdvertisements(): Observable<any> {
    return this.fs.collection('advertisements').valueChanges({idField: 'id'});
    // return this.fs.collection('advertisements', ref => ref.where('expectedPrice', '==', '123')).valueChanges();
  }

  getAdvertisement(id: string): Observable<any> {
    return this.fs.collection('advertisements').doc(id).valueChanges();
  }

  getProfileData(): Observable<any> {
    return this.fs.collection('users').doc(this.currentUser.uid).valueChanges();
  }

  getAuthorData(userId): Observable<any> {
    return this.fs.collection('users').doc(userId).valueChanges();
  }

  updateProfileData(profileData: object): void {
    this.fs.collection('users').doc(this.currentUser.uid).set(profileData);
  }

  createNewAdvertisement(advertisement: object): void {
    this.fs.collection('advertisements').add(advertisement);
  }

  // message services

  sendMessage(receiverId: string, senderId: string, advertisementId: string, content: string): void {
    const data = {
      receiverId,
      senderId,
      advertisementId,
      content
    };
    this.fs.collection('messages').add(data);
  }

  getMessages(): Observable<any> {
    return this.fs.collection('messages', ref => ref.where('receiverId', '==', this.currentUser.uid)).valueChanges({idField: 'id'});
  }
}
