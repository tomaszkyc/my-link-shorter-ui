import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FeaturesComponent } from './components/features/features.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { SupportComponent } from './components/support/support.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { MaterialModule } from "../shared/material/material.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {AuthService} from "../shared/security/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../shared/security/interceptors/auth.interceptor";
import {ErrorInterceptor} from "../shared/security/interceptors/error.interceptor";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewPasswordComponent } from './components/forgot-password/components/new-password/new-password.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';


@NgModule({
  declarations: [NavbarComponent, MainPageComponent, PricingComponent, FeaturesComponent, EnterpriseComponent, SupportComponent, PrivacyComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ContactUsComponent, NotFoundComponent, NewPasswordComponent, ActivateAccountComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class MainPageModule { }
