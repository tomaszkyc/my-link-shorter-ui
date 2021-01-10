import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import {MaterialModule} from "../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserPanelAppComponent } from './components/user-panel-app/user-panel-app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LinksComponent } from './components/links/links.component';
import {MainPageModule} from "../main-page/main-page.module";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { NewLinkDialogComponent } from './components/links/components/new-link-dialog/new-link-dialog.component';
import {LinkService} from "../shared/link/services/link.service";
import { EditLinkComponent } from './components/links/components/edit-link/edit-link.component';
import { DeleteLinkDialogComponent } from './components/links/components/delete-link-dialog/delete-link-dialog.component';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {getPolishPaginatorIntl} from "../shared/material/polish-paginator-intl";
import {AuthService} from "../shared/security/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../shared/security/interceptors/auth.interceptor";
import {ErrorInterceptor} from "../shared/security/interceptors/error.interceptor";
import {NotAuthorizeComponent} from "./components/not-authorize/not-authorize.component";
import { LinkActivityComponent } from './components/links/components/link-activity/link-activity.component';
import {AnQrcodeModule} from "an-qrcode";
import { QrCodeDialogComponent } from './components/links/components/qr-code-dialog/qr-code-dialog.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {customUserAuthoritiesDtoPipe} from "./components/users/pipes/custom-user-authorities-dto.pipe";
import { EditUserComponent } from './components/users/components/edit-user/edit-user.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {ShareModule} from "ngx-sharebuttons";
import { ShareLinkDialogComponent } from './components/links/components/share-link-dialog/share-link-dialog.component';
import { CreateNewInvoiceDialogComponent } from './components/payments/components/create-new-invoice-dialog/create-new-invoice-dialog.component';
import { InvoiceDetailsComponent } from './components/payments/components/invoice-details/invoice-details.component';
import { RedirectToPaymentProviderComponent } from './components/payments/components/redirect-to-payment-provider/redirect-to-payment-provider.component';
import { PaymentStatusComponent } from './components/payments/components/payment-status/payment-status.component';

@NgModule({
  declarations: [UserPanelAppComponent, SidenavComponent, LinksComponent, ToolbarComponent, UserSettingsComponent, ReportsComponent, UsersComponent, PaymentsComponent, NewLinkDialogComponent, EditLinkComponent, DeleteLinkDialogComponent, NotAuthorizeComponent, LinkActivityComponent, QrCodeDialogComponent,
    customUserAuthoritiesDtoPipe,
    EditUserComponent,
    ShareLinkDialogComponent,
    CreateNewInvoiceDialogComponent,
    InvoiceDetailsComponent,
    RedirectToPaymentProviderComponent,
    PaymentStatusComponent],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MainPageModule,
    FormsModule,
    HttpClientModule,
    AnQrcodeModule,
    ClipboardModule,
    NgApexchartsModule,
    ShareModule
  ],
  providers: [
    LinkService,
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() },
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe
  ]
})
export class UserPanelModule { }
