import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPanelAppComponent} from "./components/user-panel-app/user-panel-app.component";
import {LinksComponent} from "./components/links/links.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {UsersComponent} from "./components/users/users.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {EditLinkComponent} from "./components/links/components/edit-link/edit-link.component";
import {AuthGuard} from "../shared/security/guards/auth.guard";
import {NotAuthorizeComponent} from "./components/not-authorize/not-authorize.component";
import {LinkActivityComponent} from "./components/links/components/link-activity/link-activity.component";
import {EditUserComponent} from "./components/users/components/edit-user/edit-user.component";
import {InvoiceDetailsComponent} from "./components/payments/components/invoice-details/invoice-details.component";
import {PaymentStatus} from "./components/payments/models/payment-status";
import {PaymentStatusComponent} from "./components/payments/components/payment-status/payment-status.component";


const routes: Routes = [
  {
    path: '', component: UserPanelAppComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']},
    children: [
      {
        path: 'links', component: LinksComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']}
      },
      {
        path: 'links/:id/edit', component: EditLinkComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']}
      },
      {
        path: 'links/:id/link-activity', component: LinkActivityComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']}
      },
      {
        path: 'user-settings', component: UserSettingsComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']}
      },
      {
        path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'premium-user']}
      },
      {
        path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin']}
      },
      {
        path: 'users/:id/edit', component: EditUserComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin']}
      },
      {
        path: 'receipts-and-payments', component: PaymentsComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'premium-user']}
      },
      {
        path: 'receipts-and-payments/:id/details', component: InvoiceDetailsComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'premium-user']}
      },
      {
        path: 'receipts-and-payments/payment', canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'premium-user']},
        children: [
          { path: ':id/success', component: PaymentStatusComponent, data: {success: true} },
          { path: ':id/failure', component: PaymentStatusComponent, data: {success: false} }
        ]
      },
      {
        path: 'not-authorize', component: NotAuthorizeComponent, canActivate: [AuthGuard], data: {allowedAuthorities: ['admin', 'registered-user', 'premium-user']}
      },
      {
        path: '', redirectTo: 'links'
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
