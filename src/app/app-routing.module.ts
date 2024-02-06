import { MessagesComponent } from './pages/messages/messages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/login/login.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { LogoutComponent } from './pages/account/logout/logout.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { JobListComponent } from './modules/job/job-list.component';
import { JobViewComponent } from './modules/job/view/job-view.component';
import { JobFormComponent } from './modules/job/form/job-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/signup', component: SignupComponent },
  { path: 'account/logout', component: LogoutComponent },
  { path: 'account/settings', component: SettingsComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'messages', component: MessagesComponent },
  { 
    path: 'job',
    children: [
      {
        path: '',
        component: JobListComponent,
      },
      {
        path: 'create',
        component: JobFormComponent,
      },
      {
        path: 'edit/:id',
        component: JobFormComponent,
      },
      {
        path: ':id',
        component: JobViewComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
