import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  swaggerUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.swaggerUrl = environment.swaggerUrl;
  }

}
