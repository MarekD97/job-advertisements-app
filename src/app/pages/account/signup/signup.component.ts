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
      if(user) {
        this.router.navigate(['/account/settings']);
      }
    });
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  signUpWithEmail(fg: FormGroup): void {
    if(fg.value.password === fg.value.confirmPassword) {
      this.fs.signUp(fg.value.email, fg.value.password).then(status => {
        if(status!=true) {
          switch(status.code) {
            case 'auth/weak-password':
              this.status = 'Hasło musi się składać z przynajmniej 6 znaków!';
              break;
            case 'auth/email-already-in-use':
              this.status = 'Ten adres e-mail jest aktualnie używany przez inne konto.';
              break;
            default:
              this.status = 'Wystąpił nieoczekiwany błąd.';
              break;
          }
        } else {
          this.router.navigate(['/account/profile']);
        }
      });
    } else {
      this.status = 'Hasła nie pasują do siebie!';
    }
  }

  onSignInWithGoogleClick(): void {
    this.fs.signInWithGoogle();
  }

}
