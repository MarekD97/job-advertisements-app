import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { SignupComponent } from './pages/account/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseService } from './services/firebase.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LoginComponent } from './pages/account/login/login.component';
import { LogoutComponent } from './pages/account/logout/logout.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { NewJobComponent } from './pages/jobs/new/new.component';
import { ShowJobComponent } from './pages/jobs/show/show.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessagesComponent } from './pages/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SearchbarComponent,
    LogoutComponent,
    SettingsComponent,
    NewJobComponent,
    ShowJobComponent,
    JobsComponent,
    MessageFormComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
