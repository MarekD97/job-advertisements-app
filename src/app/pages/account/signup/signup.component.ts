import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;
  public status: string;

  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router ) {
    fs.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/account/settings']);
      }
    });
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  async signUpWithEmail(fg: FormGroup): Promise<void> {
    try {
      if (!fg.valid) {
        if (fg.value.password.length < 6) {
          throw new Error('Hasło musi się składać z przynajmniej 6 znaków!');
        } else {
          throw new Error('Nieprawidłowe dane w formularzu');
        }
      }
      if (fg.value.password !== fg.value.confirmPassword) {
        throw new Error('Hasła nie są identyczne!');
      }
      await this.fs.signUp(fg.value.email, fg.value.password).then(result => {
        if (result) {
          this.router.navigate(['/account/profile']);
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
