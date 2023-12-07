import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddBlocComponent } from './add-bloc/add-bloc.component';
import { ShowBlocComponent } from './show-bloc/show-bloc.component';
import { UpdateBlocComponent } from './update-bloc/update-bloc.component';
import { ErrorHandlingDirective } from './error-handling.directive';
import { InputValidatorDirective } from './input-validator.directive';
import { BlocInputValidatorDirective } from './bloc-input-validator.directive';
import { ImageComponent } from './image/image.component';
import { DetailBlocComponent } from './detail-bloc/detail-bloc.component';
import { AddReservationComponent } from './pages/ui-components/add-reservation/add-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    MyNewComponentComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddBlocComponent,
    ShowBlocComponent,
    UpdateBlocComponent,
    ErrorHandlingDirective,
    InputValidatorDirective,
    BlocInputValidatorDirective,
    ImageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [UserGuard,AdminGuard],

})
export class AppModule {}
