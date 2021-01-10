import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route, Router,
  UrlSegment
} from "@angular/router";
import {Observable, of} from "rxjs";
import {LinkService} from "./link.service";
import {Link} from "../models/link";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RedirectService implements CanLoad {

  constructor(private linkService: LinkService,
              private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let shortLinkToVerify: string = this.extractLinkFromSegments(segments);
    let isInternalUrl: boolean = this.isInternalUrl(shortLinkToVerify);
    if (isInternalUrl) {
      console.log('Jest to wewnętrzna ścieżka');
      return true;
    }

    return this.redirectIfNeeded(shortLinkToVerify);
  }

  extractLinkFromSegments(segments: UrlSegment[]): string {
    const fullPath = segments.reduce((path, currentSegment) => {
      return `${path}/${currentSegment.path}`;
    }, '');
    return fullPath.substr(1);
  }

  isInternalUrl(shortLink: string): boolean {
    if (shortLink === '' || shortLink === undefined || shortLink === null) {
      return true;
    }
    let regexp = new RegExp('^pages\\/|^app\\/|^app');
    return regexp.test(shortLink);
  }

  redirectIfNeeded(shortLinkToVerify: string): Promise<boolean> {
    return new Promise<boolean>( (resolve, reject) => {
      this.linkService.getLinkByShortLink(shortLinkToVerify).subscribe((link: Link) => {
        window.location.href = link.longLink;
        resolve(false);
      },
        (error: HttpErrorResponse) => {
        console.error('No short link was found - error:' + error.error);
          resolve(true);
        });
    });
  }

}
