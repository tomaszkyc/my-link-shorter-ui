import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Link} from "../models/link";
import {Observable} from "rxjs";
import {LinkActivity} from "../models/link-activity";

@Injectable({
  providedIn: 'root'
})
export class LinkActivityService {

  constructor(private http: HttpClient) { }

  getLinkActivities(link: Link): Observable<LinkActivity[]> {
    return this.http.get<LinkActivity[]>('server/api/v1/link-activity/' + link.id);
  }


}
