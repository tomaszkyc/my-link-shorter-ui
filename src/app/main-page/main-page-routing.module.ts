import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PricingComponent} from "./components/pricing/pricing.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {FeaturesComponent} from "./components/features/features.component";
import {EnterpriseComponent} from "./components/enterprise/enterprise.component";
import {SupportComponent} from "./components/support/support.component";
import {PrivacyComponent} from "./components/privacy/privacy.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ContactUsComponent} from "./components/contact-us/contact-us.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {NewPasswordComponent} from "./components/forgot-password/components/new-password/new-password.component";
import {ActivateAccountComponent} from "./components/activate-account/activate-account.component";


const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'pages/features', component: FeaturesComponent
  },
  {
    path: 'pages/pricing', component: PricingComponent
  },
  {
    path: 'pages/enterprise', component: EnterpriseComponent
  },
  {
    path: 'pages/support', component: SupportComponent
  },
  {
    path: 'pages/privacy', component: PrivacyComponent
  },
  {
    path: 'pages/login', component: LoginComponent
  },
  {
    path: 'pages/activate-account/:id', component: ActivateAccountComponent
  },
  {
    path: 'pages/register', component: RegisterComponent
  },
  {
    path: 'pages/forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'pages/forgot-password/:id', component: NewPasswordComponent
  },
  {
    path: 'pages/contact-us', component: ContactUsComponent
  },
  {
    path: ':shortLink', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
