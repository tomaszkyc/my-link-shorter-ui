import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  externalApplicationUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.externalApplicationUrl = environment.externalApplicationUrl;
  }

}
