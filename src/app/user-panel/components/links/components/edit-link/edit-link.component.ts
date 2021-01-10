import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Link} from "../../../../../shared/link/models/link";
import {LinkService} from "../../../../../shared/link/services/link.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../../shared/security/services/auth.service";
import {LinkValidationService} from "../../../../../shared/link/services/link-validation.service";

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.scss']
})
export class EditLinkComponent implements OnInit {
  editLinkForm: FormGroup;
  minDate: Date;
  link: Link;
  dataFetched: boolean = false;

  constructor(private linkService: LinkService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
    this.editLinkForm = new FormGroup({
      shortLink: new FormControl({
        value: '',
        disabled: !authService.getCurrentUser().hasAnyAuthority(['admin', 'premium-user'])
      }, [Validators.required]),
      longLink: new FormControl('', [Validators.required, LinkValidationService.isShortLinkAlreadyShortened]),
      creationDate: new FormControl({value: '', disabled: true}, [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      active: new FormControl(true, [])
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      let id = params.id;
      this.getLink(id);
    });
  }

  saveLink(): void {
    if (this.editLinkForm.valid) {
      this.link.shortLink = this.editLinkForm.get('shortLink').value;
      this.link.longLink = this.editLinkForm.get('longLink').value;
      this.link.expirationDate = this.editLinkForm.get('expirationDate').value;
      if (typeof this.link.expirationDate == 'string') {
        this.link.expirationDate = new Date(this.link.expirationDate);
      }
      this.link.expirationDate.setHours(23, 59, 59);
      this.link.active = this.editLinkForm.get('active').value;
      this.linkService.updateLink(this.link).subscribe(result => {
          this.snackBar.open('Link poprawnie zaktualizowany', '', {duration: 5000});
          this.router.navigate(['/app/links']);
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error, '', {duration: 5000});
        });
    }
  }

  getLink(id: string): void {
    console.log(`Pobieram szczegóły linku: ${id}`);
    this.linkService.getLink(id).subscribe(result => {
        this.link = result;
        this.dataFetched = true;
        this.fillFormData(this.link);
      },
      (error: HttpErrorResponse) => {
        console.log("error: ", error);
        this.snackBar.open(error.error, '', {duration: 5000});
      });
  }

  fillFormData(link: Link): void {
    this.editLinkForm.get('shortLink').setValue(link.shortLink);
    this.editLinkForm.get('longLink').setValue(link.longLink);
    this.editLinkForm.get('creationDate').setValue(link.creationDate);
    this.editLinkForm.get('expirationDate').setValue(link.expirationDate);
    this.editLinkForm.get('active').setValue(link.active);
  }
}
