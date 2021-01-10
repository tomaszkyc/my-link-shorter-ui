import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/security/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/pages/login']);
  }
}
