import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RedirectService} from "./shared/link/services/redirect.service";


const routes: Routes = [
  {
    path: 'app', loadChildren: () => import('./user-panel/user-panel.module').then(m => m.UserPanelModule), canLoad: [RedirectService]
  },
  {
    path: '', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule), canLoad: [RedirectService]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
