import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../shared/security/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  dataFetched: boolean = false;
  isAccountActivated: boolean = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log('TEST');
    this.route.params.subscribe(params => {
      let userId = params.id;
      console.log(`Pobrane userId: ${userId}`);
      if (userId) {
        this.activateUserAccount(userId);
      } else {
        this.dataFetched = true;
      }
    });
  }

  activateUserAccount(userId: string): void {
    this.authService.activateUserAccount(userId).subscribe((result: boolean) => {
      this.isAccountActivated = result;
      this.dataFetched = true;
    },
      (error: HttpErrorResponse) => {
      this.dataFetched = true;
      });
  }

}
