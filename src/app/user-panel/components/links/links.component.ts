import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewLinkDialogComponent} from "./components/new-link-dialog/new-link-dialog.component";
import {LinkService} from "../../../shared/link/services/link.service";
import {Link} from "../../../shared/link/models/link";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DeleteLinkDialogComponent} from "./components/delete-link-dialog/delete-link-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {QrCodeDialogComponent} from "./components/qr-code-dialog/qr-code-dialog.component";
import {UserSettingsService} from "../user-settings/services/user-settings.service";
import {AuthService} from "../../../shared/security/services/auth.service";
import {ShareLinkDialogComponent} from "./components/share-link-dialog/share-link-dialog.component";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  displayedColumns: string[] = ['shortLink', 'longLink', 'creationDate', 'expirationDate', 'active', 'actions'];
  dataSource = new MatTableDataSource<Link>([]);
  customPageSize: number = 5;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private linkService: LinkService,
              private snackBar: MatSnackBar,
              private userSettingsService: UserSettingsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getLinks();
    this.getCustomPageSize();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCustomPageSize(): void {
    this.userSettingsService.getCustomPageSize().subscribe((customPageSize: number) => {
      this.customPageSize = customPageSize;
    });
  }

  openCreateLinkDialog(): void {
    console.log('Kliknięto w przycisk Stwórz nowy link');
    let dialogRef = this.dialog.open(NewLinkDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed', result);
      if (result) {
        this.linkService.createLink(result).subscribe(result => {
            console.log('Link dodany przez API', result);
            this.snackBar.open('Link pomyślnie utworzony', '', {duration: 5000});
            this.getLinks();
          },
          (error: HttpErrorResponse) => {
            console.error('Wystąpił błąd przy tworzeniu linku. Komunikat: ' + error.error);
            this.snackBar.open('Wystąpił błąd przy tworzeniu linku. Komunikat: ' + error.error, '', {duration: 5000});
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLinks(): void {
    console.log('Rozpoczynam pobieranie linków pobieranie linków');
    this.linkService.getLinks().subscribe(result => {
      this.dataSource.data = result;
    });
  }

  openDeleteLinkDialog(link: Link) {
    let dialogRef = this.dialog.open(DeleteLinkDialogComponent, {
      width: '450px',
      data: {'shortLink': link.shortLink}
    });

    dialogRef.afterClosed().subscribe(deleteLink => {
      if (deleteLink) {
        this.linkService.deleteLink(link.id).subscribe(data => {
            this.snackBar.open('Link pomyślnie usunięty', '', {duration: 5000});
            this.getLinks();
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.snackBar.open(error.message, '', {duration: 5000});
          });
      }
    });
  }

  openShowQrCodeDialog(link: Link) {
    let shortLinkForExternalUse = this.linkService.createShortLinkForExternalUser(link);
    this.dialog.open(QrCodeDialogComponent, {
      width: '450px',
      data: {
        'shortLink': link.shortLink,
        'shortLinkForExternalUse': shortLinkForExternalUse
      }
    });
  }

  openShareLinkDialog(link: Link): void {
    let shortLinkForExternalUse = this.linkService.createShortLinkForExternalUser(link);
    this.dialog.open(ShareLinkDialogComponent, {
      width: '450px',
      data: {
        'shortLinkForExternalUse': shortLinkForExternalUse
      }
    });
  }

  generateShortLinkToExternalUsage(link: Link): string {
    let shortLinkToExternalUsage = this.linkService.createShortLinkForExternalUser(link);
    return shortLinkToExternalUsage;
  }

  clickCopyButton(): void {
    this.snackBar.open('Link skopiowany do schowka', '', {duration: 5000});
  }

  hasAnyAuthority(authorities: string[]): boolean {
    let hasAnyAuthority = this.authService.getCurrentUser().hasAnyAuthority(authorities);
    return hasAnyAuthority;
  }
}
