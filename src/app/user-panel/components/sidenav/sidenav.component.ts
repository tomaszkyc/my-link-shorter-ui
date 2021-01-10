import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/security/services/auth.service";
import {UserSettingsService} from "../user-settings/services/user-settings.service";
import {User} from "../../../shared/security/models/user";
import {SidenavDirection} from "../user-settings/models/sidenav-direction";
import {UserSettings} from "../user-settings/models/user-settings";

const SMALL_WIDTH_BREAKPOINT = 992;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  direction: string = 'ltr';
  constructor(zone: NgZone, private router: Router,
              private authService: AuthService,
              private userSettingsService: UserSettingsService) {
    this.mediaMatcher.addEventListener("change", () => {
      zone.run(() => this.isScreenSmall());
    });
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {

    this.router.events.subscribe(() => {

      if (this.isScreenSmall()) {
        this.sidenav.close();
      }

    });
    this.userSettingsService.getSidenavPosition().subscribe((sidenavPosition: string)=> {
      console.log(`Pobrana pozycja: ${sidenavPosition}`);
      this.direction = sidenavPosition;
    });

  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleDirection() {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }

  hasAuthority(authorityName: string): boolean {
    return this.authService.getCurrentUser().hasAuthority(authorityName);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    return this.authService.getCurrentUser().hasAnyAuthority(authorities);
  }
}
