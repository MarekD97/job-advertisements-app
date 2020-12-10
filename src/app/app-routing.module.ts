import { MessagesComponent } from './pages/messages/messages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/login/login.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { JobsComponent} from './pages/jobs/jobs.component';
import { LogoutComponent } from './pages/account/logout/logout.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { NewJobComponent } from './pages/jobs/new/new.component';
import { ShowJobComponent } from './pages/jobs/show/show.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/signup', component: SignupComponent },
  { path: 'account/logout', component: LogoutComponent },
  { path: 'account/settings', component: SettingsComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/new', component: NewJobComponent },
  { path: 'jobs/:id', component: ShowJobComponent },
  { path: 'jobs/edit/:id', component: NewJobComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
