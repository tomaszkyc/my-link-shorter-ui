import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Link} from "../models/link";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  createLink(link: Link): Observable<Link | undefined> {
    return this.http.post<Link | undefined>('server/api/v1/link', link);
  }

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>('server/api/v1/link');
  }

  getLink(id: string): Observable<Link>{
    return this.http.get<Link>('server/api/v1/link/' + id);
  }

  updateLink(link: Link): Observable<Link> {
    return this.http.put<Link>('server/api/v1/link/' + link.id, link);
  }

  deleteLink(id: number): Observable<void> {
    return this.http.delete<void>('server/api/v1/link/' + id);
  }

  getLinkByShortLink(shortLink: string): Observable<Link> {
    return this.http.get<Link>('server/api/v1/link/' + shortLink + '/fetch-user-data');
  }

  createShortLinkForExternalUser(link: Link): string {
    let externalApplicationUrl = environment.externalApplicationUrl;
    return `${externalApplicationUrl}/${link.shortLink}`;
  }
}
