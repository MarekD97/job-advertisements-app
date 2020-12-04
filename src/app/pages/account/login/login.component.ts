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
  public userAuth: Subscription;
  public isEmailWindowOpened = false;
  public loginForm: FormGroup;
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router) {
    fs.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/account/settings']);
      }
    });
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  async loginWithEmail(fg: FormGroup): Promise<void>{
    try {
      if (!fg.valid) {
        throw new Error('Invalid sign-in credentials');
      }
      const result = await this.fs.signIn(fg.value.email, fg.value.password);
      console.log('that tickles', result);
      if (result) {
        this.router.navigate([ 'tasks' ]);
      } else {
        throw new Error('Sign-in failed');
      }
    } catch (error) {
        console.log(error);
    }
  }

  onSignInWithGoogleClick(): void {
    this.fs.signInWithGoogle();
  }

  onSignInWithFacebookClick(): void {
    this.fs.signInWithFacebook();
  }

  openEmailWindow(): void {
    this.isEmailWindowOpened = true;
  }

}
