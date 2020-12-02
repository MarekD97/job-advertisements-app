import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogged = false;
  currentUser: any;
  constructor(public fs: AngularFirestore, public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user)=> {
      // console.log(user);
      if(user) {
        this.currentUser = user;
        console.log(this.currentUser)
      }
    })
  }

  //Sign in existing users
  async signIn(email: string, password: string) {
    try {
      if(!email || !password) throw new Error('Invalid email and/or password')
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        this.isLogged = true;
      });
      return true;
    } catch(error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  //Sign up new users
  async signUp(email: string, password: string) {
    console.log('New user');
    try {
      if(!email || !password) throw new Error('Invalid email and/or password')
      await this.auth.createUserWithEmailAndPassword(email, password)
      .then(res=>{
        this.isLogged = true;
        this.auth.onAuthStateChanged((user)=>{
          this.currentUser = user;
        })
      });
      return true;
    } catch(error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  async signOut() {
    try {
      await this.auth.signOut()
      .then(res=>{
        this.isLogged = false;
      });
      return true;
    } catch(error) {
      console.log('Sign out failed', error);
      return false;
    }
  }

  async signInWithGoogle() {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      this.auth.onAuthStateChanged((user)=>{
        this.currentUser = user;
      })
    } catch(error) {
      console.log('Login with Google failed', error);
    }
  }

  async sendEmailVerification() {
    await this.currentUser.sendEmailVerification()
    .then(res=>{
      console.log('Sent Email Verification. Check the email.');
    })
  }

  getAdvertisements() {
    return this.fs.collection('advertisements').valueChanges({idField: 'id'});
  }

  getProfileData() {
    // console.log(this.currentUser.uid);
    return this.fs.collection('users').doc(this.currentUser.uid).valueChanges();
  }

  getAuthorData(userId) {
    return this.fs.collection('users').doc(userId).valueChanges();
  }

  updateProfileData(profileData: Object) {
    this.fs.collection('users').doc(this.currentUser.uid).set(profileData);
  }

  createNewAdvertisement(advertisement: Object) {
    this.fs.collection('advertisements').add(advertisement);
  }
}
