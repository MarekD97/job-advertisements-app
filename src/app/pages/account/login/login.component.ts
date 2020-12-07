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

  public loginForm: FormGroup;
  public status: string;

  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router) {
    fs.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/account/settings']);
      }
    });
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  async loginWithEmail(fg: FormGroup): Promise<void> {
    try {
      if (!fg.valid) {
        throw new Error('Nieprawidłowe dane w formularzu');
      }
      await this.fs.signIn(fg.value.email, fg.value.password).then(result => {
        if (result) {
          this.router.navigate(['/account/settings']);
        } else {
          throw new Error(this.fs.errorMessage);
        }
      });
    } catch (error) {
      this.status = error.message;
    }
  }

  onSignInWithGoogleClick(): void {
    this.fs.signInWithGoogle();
  }

  onSignInWithFacebookClick(): void {
    this.fs.signInWithFacebook();
  }

}
