import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserGuard } from './guards/user.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddBlocComponent } from './add-bloc/add-bloc.component';
import { ShowBlocComponent } from './show-bloc/show-bloc.component';
import { ImageComponent } from './image/image.component';
import { DetailBlocComponent } from './detail-bloc/detail-bloc.component';


const routes: Routes = [


  

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {path:'addBloc',component:AddBlocComponent},


  {path:'image',component:ImageComponent},

 // {path:'showBloc',component:ShowBlocComponent},

 

  {
    
    path: '',

    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',     
        pathMatch: 'full',
      },



      {
        path: 'dashboard',
        canActivate:[UserGuard],
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'content',
        canActivate:[UserGuard],
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        canActivate:[UserGuard],
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'foyer',
        canActivate:[UserGuard],
        loadChildren: () =>
          import('./pages/ui-components/Foyer/foyer.module').then(
            (module) => module.FoyerModule
          ),
      },
    ],
  },
  { path: 'login', canActivate:[UserGuard], component: LoginComponent },
  { path: 'register',  canActivate:[UserGuard],component: RegisterComponent },
  { path: 'profile', canActivate:[UserGuard], component: ProfileComponent },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },


  
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
