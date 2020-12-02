import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  label = {
    email: 'Email',
    password: 'Hasło',
    login: 'Zaloguj się',
    loginSubtitle: 'Poniżej dostępne opcje',
    loginWithEmail: 'Zaloguj przez Email',
    loginWithGoogle: 'Zaloguj przez Google'
  }
  button = {
    login: 'Zaloguj',
    cancel: 'Anuluj'
  };

  public userAuth: Subscription;
  public isEmailWindowOpened: boolean = false;
  public loginForm: FormGroup;
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router) {
    fs.auth.onAuthStateChanged((user)=>{
      if(user) {
        this.router.navigate(['/advertisements']);
      }
    })
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  async loginWithEmail(fg: FormGroup) {
    try {
      if (!fg.valid) throw new Error('Invalid sign-in credentials');
      const result = await this.fs.signIn(fg.value.email, fg.value.password);
      console.log('that tickles', result);
      if (result) this.router.navigate([ 'tasks' ]);
      else throw new Error('Sign-in failed');
    } catch (error) {
        console.log(error);
    }
    // (await this.fs.auth.currentUser).updateProfile({
    //   displayName: "mdorosz2",
    //   photoURL: 'https://simpleicon.com/wp-content/uploads/account.png'
    // });
  }

  onSignInWithGoogleClick() {
    this.fs.signInWithGoogle();
  }

  openEmailWindow() {
    this.isEmailWindowOpened = true;
  }

}
