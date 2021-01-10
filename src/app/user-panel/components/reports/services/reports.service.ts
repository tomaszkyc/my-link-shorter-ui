import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupByDto} from "../models/group-by-dto";
import {ReportDto} from "../models/report-dto";
import {ReportParametersDto} from "../models/report-parameters-dto";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private API_ENDPOINT: string = '/server/api/v1/reports';
  constructor(private http: HttpClient) { }

  getGroupByDtoValues(): Observable<GroupByDto[]> {
    return this.http.get<GroupByDto[]>(`${this.API_ENDPOINT}/group-by-parameters`);
  }

  generateReport(reportParametersDto: ReportParametersDto): Observable<ReportDto> {
    return this.http.post<ReportDto>(`${this.API_ENDPOINT}/generate`, reportParametersDto);
  }
}
