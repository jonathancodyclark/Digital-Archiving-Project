import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { ExhibitDetailComponent } from './exhibits/exhibit-detail.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ArtifactDetailComponent } from './artifacts/artifact-detail.component';
import { LoginComponent } from './login/login.component'
import { AppUsersComponent} from './appusers/appusers.component';
import { NewUserComponent } from './appusers/newUser.component';
import { ForgotPassComponent } from './forgotPass/forgotPass.component';
import { ChangePassComponent } from './changePass/changePass.component';
import { ProfilePageComponent } from './profilePage/profilePage.component';



 
const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'manageusers', component: AppUsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'exhibits', component: ExhibitsComponent },
  { path: 'exhibit-detail', component: ExhibitDetailComponent },
  { path: 'artifacts/:id', component: ArtifactsComponent },
  { path: 'artifact-detail', component: ArtifactDetailComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'forgot', component: ForgotPassComponent },
  { path: 'change', component: ChangePassComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
