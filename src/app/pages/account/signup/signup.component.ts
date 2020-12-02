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
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router ) {
    fs.auth.onAuthStateChanged((user)=>{
      if(user) {
        this.router.navigate(['/']);
      }
    });
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  signUpWithEmail(fg: FormGroup) {
    if(fg.value.password === fg.value.passwordRepeat) {
      this.fs.signUp(fg.value.email, fg.value.password);
      console.log("Utworzono");
    } else {
      console.log("Hasła nie pasują do siebie!");
    }
  }

  signInWithGoogle() {
    this.fs.signInWithGoogle();
  }

}
