import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Link} from "../../../../../shared/link/models/link";
import {LinkActivity} from "../../../../../shared/link/models/link-activity";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkActivityService} from "../../../../../shared/link/services/link-activity.service";
import {Observable} from "rxjs";
import {LinkService} from "../../../../../shared/link/services/link.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserSettingsService} from "../../../user-settings/services/user-settings.service";

@Component({
  selector: 'app-link-activity',
  templateUrl: './link-activity.component.html',
  styleUrls: ['./link-activity.component.scss']
})
export class LinkActivityComponent implements OnInit {
  link: Link;
  dataFetched: boolean = false;
  displayedColumns: string[] = ['activityDate', 'deviceClass', 'deviceName', 'deviceBrand'
                                , 'osClass', 'osName', 'osVersion', 'agentClass', 'agentName'
                                , 'agentVersion', 'agentVersionMajor'];
  dataSource = new MatTableDataSource<LinkActivity>([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  customPageSize: number;

  constructor(private route: ActivatedRoute,
              private linkActivityService: LinkActivityService,
              private linkService: LinkService,
              private router: Router,
              private snackBar: MatSnackBar,
              private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.route.params.subscribe(params => {
      console.log(params);
      let id = params.id;
      this.getLink(id);
    });
    this.getCustomPageSize();
  }

  getCustomPageSize(): void {
    this.userSettingsService.getCustomPageSize().subscribe((customPageSize: number) => {
      this.customPageSize = customPageSize;
    });
  }

  getLink(id: string): void {
    this.linkService.getLink(id).subscribe( (data: Link) => {
      this.link = data;
      this.linkActivityService.getLinkActivities(this.link).subscribe(data => {
          this.dataSource.data = data;
          this.dataFetched = true;
      },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error, '', {duration: 10000});
        });
    },
      (error: HttpErrorResponse) => {
      console.error(error.error);
      this.snackBar.open(error.error, '', {duration: 5000});
      this.dataFetched = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backToAllLinks(): void {
    this.router.navigate(['/app/links']);
  }
}
