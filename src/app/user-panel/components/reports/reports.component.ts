import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupByDto} from "./models/group-by-dto";
import {Observable} from "rxjs";
import {ReportsService} from "./services/reports.service";
import {ReportParametersDto} from "./models/report-parameters-dto";
import {ReportDto} from "./models/report-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChartOptions} from "./models/chart-options";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dataFetched: boolean = false;
  reportsForm: FormGroup;
  groupByDtos: Observable<GroupByDto[]>;
  groupedPieChartOptions: Partial<ChartOptions> = null;
  datesLineChartOptions: Partial<ChartOptions> = null;
  dayHoursPieChartOptions: Partial<ChartOptions> = null

  constructor(private reportsService: ReportsService,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe) {
    this.constructForm();
  }

  ngOnInit(): void {
    this.groupByDtos = this.reportsService.getGroupByDtoValues();
    this.dataFetched = true;
  }

  compareGroupByDtos(s1: GroupByDto, s2: GroupByDto): boolean {
    return s1 && s2 ? s1.value === s2.value : s1 === s2;
  }

  generateReportClick() {
    if (this.reportsForm.valid) {
      this.generateReports();
    }
  }

  generateReports(): void {
    let reportParametersDto = this.buildReportParametersDtoFromForm();
    this.generateGroupedByReport(reportParametersDto);
    this.generateActivityDatesReport(reportParametersDto);
    this.generateDayHoursReport(reportParametersDto);
  }

  generateDayHoursReport(reportParametersDto: ReportParametersDto): void {
    let activityDateReportParametersDto = new ReportParametersDto();
    activityDateReportParametersDto.put('dateFrom', reportParametersDto.get('dateFrom'));
    activityDateReportParametersDto.put('dateTo', reportParametersDto.get('dateTo'));
    activityDateReportParametersDto.put('groupBy', 'DAY_HOURS');
    this.reportsService.generateReport(activityDateReportParametersDto).subscribe((result: any) => {
        let reportDto = ReportDto.parse(result);
        this.buildDayHoursPieChart(reportDto);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = `Wystąpił błąd podczas generowania raportu: ${error.error}`;
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  buildDayHoursPieChart(reportDto: ReportDto): void {
    this.dayHoursPieChartOptions = {
      series: reportDto.dataValues(),
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        defaultLocale: 'pl',
        locales: ChartOptions.getLocale()
      },
      labels: reportDto.dataLabels(),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      noData: {
        verticalAlign: "middle",
        align: "center",
        text: "Brak danych dla podanych parametrów raportu"
      },
      title: {
        align: "center",
        text: "Kliknięcia zgrupowane po godzinach dnia"
      }
    };
  }

  generateGroupedByReport(reportParametersDto: ReportParametersDto): void {
    this.reportsService.generateReport(reportParametersDto).subscribe((result: any) => {
        let reportDto = ReportDto.parse(result);
        this.buildGroupedChart(reportDto);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = `Wystąpił błąd podczas generowania raportu: ${error.error}`;
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  generateActivityDatesReport(reportParametersDto: ReportParametersDto): void {
    let activityDateReportParametersDto = new ReportParametersDto();
    activityDateReportParametersDto.put('dateFrom', reportParametersDto.get('dateFrom'));
    activityDateReportParametersDto.put('dateTo', reportParametersDto.get('dateTo'));
    activityDateReportParametersDto.put('groupBy', 'ACTIVITY_DATE');
    this.reportsService.generateReport(activityDateReportParametersDto).subscribe((result: any) => {
        let reportDto = ReportDto.parse(result);
        this.buildActivityDateChart(reportDto);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = `Wystąpił błąd podczas generowania raportu: ${error.error}`;
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  buildActivityDateChart(reportDto: ReportDto): void {
    this.datesLineChartOptions = {
      series: [
        {
          name: "Ilość kliknięć w link",
          data: reportDto.dataValues()
        }
      ],
      chart: {
        height: 300,
        width: 500,
        type: "line",
        zoom: {
          enabled: false
        },
        defaultLocale: 'pl',
        locales: ChartOptions.getLocale()
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: reportDto.dataLabels()
      },
      dataFetched: reportDto.anyDataFetched(),
      noData: {
        verticalAlign: "middle",
        align: "center",
        text: "Brak danych dla podanych parametrów raportu"
      },
      title: {
        align: "center",
        text: "Kliknięcia zgrupowane po dniach"
      }
    };
  }

  buildGroupedChart(reportDto: ReportDto): void {
    this.groupedPieChartOptions = {
      series: reportDto.dataValues(),
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        defaultLocale: 'pl',
        locales: ChartOptions.getLocale()
      },
      labels: reportDto.dataLabels(),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      noData: {
        verticalAlign: "middle",
        align: "center",
        text: "Brak danych dla podanych parametrów raportu"
      },
      title: {
        align: "center",
        text: "Kliknięcia zgrupowane po parametrze"
      }
    };
  }

  buildReportParametersDtoFromForm(): ReportParametersDto {
    let reportParametersDto = new ReportParametersDto();
    const groupByDto: GroupByDto = this.reportsForm.get('groupByDto').value;
    reportParametersDto.put('groupBy', groupByDto.value);
    let formattedDateFrom = this.datePipe.transform(this.reportsForm.get('dateFrom').value, 'yyyy-MM-dd');
    let formattedDateTo = this.datePipe.transform(this.reportsForm.get('dateTo').value, 'yyyy-MM-dd');
    reportParametersDto.put('dateFrom', formattedDateFrom);
    reportParametersDto.put('dateTo', formattedDateTo);
    return reportParametersDto;
  }

  private constructForm() {
    this.reportsForm = new FormGroup({
      groupByDto: new FormControl('', [Validators.required]),
      dateFrom: new FormControl('', [Validators.required]),
      dateTo: new FormControl('', [Validators.required])
    });
  }
}
