import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidarTokenGuard } from './guard/validar-token.guard';
import { CovidDeathsUSComponent } from './covid-deaths-us/covid-deaths-us.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ValidarTokenGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'covid', component: CovidDeathsUSComponent },
      { path: '', redirectTo: '/dashboard/users', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
