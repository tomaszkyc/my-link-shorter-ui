import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserSettings} from "../models/user-settings";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private API_ENDPOINT: string = '/server/api/v1/user-settings';

  constructor(private http: HttpClient) {
  }

  getUserSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.API_ENDPOINT}`);
  }

  getCustomPageSize(): Observable<number> {
    return this.getUserSettings().pipe(
      map((userSettings: UserSettings) => Number.parseInt(userSettings.userAdditionalProperties['custom-page-size']))
    );
  }

  getSidenavPosition(): Observable<string> {
    return this.getUserSettings().pipe(
      map((userSettings: UserSettings) =>
        userSettings.userAdditionalProperties['sidenav-position'])
    );
  }

  updateUserSettings(userSettings: UserSettings): Observable<any> {
    return this.http.put<any>(`${this.API_ENDPOINT}`, userSettings);
  }
}
