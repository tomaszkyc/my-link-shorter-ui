import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../models/user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserDtoService {
  private API_ENDPOINT: string = '/server/api/v1/users';

  constructor(private http: HttpClient) {
  }


  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.API_ENDPOINT}`);
  }

  getUser(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.API_ENDPOINT}/${id}`);
  }

  updateUser(userDto: UserDto): Observable<any> {
    return this.http.put(`${this.API_ENDPOINT}/${userDto.id}`, userDto);
  }
}
