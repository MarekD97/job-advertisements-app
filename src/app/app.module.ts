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
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SettingsBarComponent } from './components/settings-bar/settings-bar.component';
import { JobFormComponent } from './modules/job/form/job-form.component';
import { JobViewComponent } from './modules/job/view/job-view.component';
import { JobListComponent } from './modules/job/job-list.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { MomentPipe } from './shared/pipes/moment.pipe';

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
    MessageFormComponent,
    MessagesComponent,
    ToolbarComponent,
    ListItemComponent,
    SettingsBarComponent,
    JobFormComponent,
    JobViewComponent,
    JobListComponent,
    SpinnerComponent,
    MomentPipe,
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
