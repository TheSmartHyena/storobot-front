import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { StorobotComponent } from './components/storobot/storobot.component';
import { RobotComponent } from './components/robot/robot.component';

import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'log-in', component: SigninComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'storobot', component: StorobotComponent, canActivate: [AuthGuard] },
    { path: 'robot/:id', component: RobotComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
