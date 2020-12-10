import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

const firebaseErrors = {
  'auth/too-many-requests': 'Zarejestrowano nietypową aktywność. Spróbuj ponownie później.',
  'auth/unauthorized-domain': 'Nieautoryzowana domena.',
  'auth/user-not-found': 'Użytkownik o takim adresie e-mail nie istnieje',
  'auth/user-disabled': 'Użytkownik zablokowany przez administratora.',
  'auth/weak-password': 'Hasło musi się składać z przynajmniej 6 znaków!',
  'auth/email-already-in-use': 'Ten adres e-mail jest aktualnie używany przez inne konto.',
  'auth/wrong-password': 'Niepoprawne hasło!'
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogged = false;
  currentUser: any;
  errorMessage: any;
  constructor(public fs: AngularFirestore, public auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.isLogged = true;
      } else {
        this.currentUser = undefined;
        this.isLogged = false;
      }
    });
  }

  // Sign in existing users
  async signIn(email: string, password: string): Promise<boolean> {
    try {
      if (!email || !password) {
        throw new Error('Invalid email and/or password');
      }
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
      });
      return true;
    } catch (error) {
      console.log(error);
      this.errorMessage = firebaseErrors[error.code];
      return false;
    }
  }

  // Sign up new users
  async signUp(email: string, password: string): Promise<any> {
    try {
      if (!email || !password) {
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
      this.errorMessage = firebaseErrors[error.code];
      return false;
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await this.auth.signOut()
      .then(res => {
        this.auth.onAuthStateChanged((user) => {
          if(!user) {
            this.currentUser = undefined;
            this.isLogged = false;
          }
        });
      });
      return true;
    } catch (error) {
      this.errorMessage = firebaseErrors[error.code];
      return false;
    }
  }

  async signInWithGoogle(): Promise<boolean> {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.auth.onAuthStateChanged((user) => {
          this.currentUser = user;
          this.isLogged = true;
        });
      });
      return true;
    } catch (error) {
      this.errorMessage = firebaseErrors[error.code];
      return false;
    }
  }

  async signInWithFacebook(): Promise<boolean> {
    try {
      await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.auth.onAuthStateChanged((user) => {
          this.currentUser = user;
          this.isLogged = true;
        });
      });
      return true;
    } catch (error) {
      this.errorMessage = firebaseErrors[error.code];
      return false;
    }
  }

  async sendEmailVerification(): Promise<void> {
    await this.currentUser.sendEmailVerification()
    .then(() => {
      console.log('Sent Email Verification. Check the email.');
    });
  }

  getAdvertisements(): Observable<any> {
    return this.fs.collection('advertisements', ref => ref.where('isActive', '==', true).orderBy('updatedAt', 'desc')).valueChanges({idField: 'id'});
  }
  getLastAdvertisements(number: number): Observable<any> {
    return this.fs.collection('advertisements', ref => ref.where('isActive', '==', true).orderBy('updatedAt', 'desc').limit(number)).valueChanges({idField: 'id'});
  }

  getAdvertisement(id: string): Observable<any> {
    return this.fs.collection('advertisements').doc(id).valueChanges();
  }

  getUserAdvertisements(): Observable<any> {
    const userAdvertisements = this.fs.collection('advertisements', ref => ref.where('userAccountId', '==', this.currentUser.uid));
    return userAdvertisements.valueChanges({idField: 'id'});
  }

  getProfileData(): Observable<any> {
    return this.fs.collection('users').doc(this.currentUser.uid).valueChanges();
  }

  getAuthorData(userId: string): Observable<any> {
    return this.fs.collection('users').doc(userId).valueChanges();
  }

  updateProfileData(profileData: object): void {
    this.fs.collection('users').doc(this.currentUser.uid).set(profileData);
  }

  createNewAdvertisement(advertisement: object): void {
    this.fs.collection('advertisements').add(advertisement);
  }

  sendMessage(receiverId: string, senderId: string, advertisementId: string, content: string): void {
    const data = {
      receiverId,
      senderId,
      advertisementId,
      content,
      createdAt: Date.now()
    };
    this.fs.collection('messages').add(data);
  }

  getMessages(): Observable<any> {
    return this.fs.collection('messages', ref => ref.where('receiverId', '==', this.currentUser.uid)).valueChanges({idField: 'id'});
  }
}
