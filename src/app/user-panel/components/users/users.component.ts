import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserDtoService} from "./services/user-dto.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserDto} from "./models/user-dto";
import {UserSettingsService} from "../user-settings/services/user-settings.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataFetched: boolean = false;
  displayedColumns: string[] = ['username', 'fullName', 'email', 'enabled', 'userAuthorities', 'actions'];
  dataSource = new MatTableDataSource<UserDto>([]);
  customPageSize: number = 5;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar,
              private userDtoService: UserDtoService,
              private userSettingsService: UserSettingsService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCustomPageSize();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCustomPageSize(): void {
    this.userSettingsService.getCustomPageSize().subscribe((customPageSize: number) => {
      this.customPageSize = customPageSize;
    });
  }

  getUsers(): void {
    this.userDtoService.getUsers().subscribe((users: UserDto[]) => {
        this.dataSource.data = users;
        console.log(users);
        this.dataFetched = true;
      },
      (error: HttpErrorResponse) => {
        let errorMessage = `Wystąpił problem podczas pobierania użytkowników: ${error.error}`;
        console.error(errorMessage);
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
