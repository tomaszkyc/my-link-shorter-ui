import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {LinkService} from "../../../shared/link/services/link.service";
import {Link} from "../../../shared/link/models/link";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {LinkValidationService} from "../../../shared/link/services/link-validation.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  createLinkForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;


  constructor(private linkService: LinkService,
              private snackBar: MatSnackBar) {
    this.createLinkForm = new FormGroup({
      link: new FormControl('', [LinkValidationService.isShortLinkAlreadyShortened, Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let longLinkToShorten: string = this.createLinkForm.get('link').value as string;
    if (this.createLinkForm.valid && longLinkToShorten) {
      this.createLink(longLinkToShorten);
    }
  }

  createLink(longLinkToShorten: string) {
    let link: Link = new Link();
    link.longLink = longLinkToShorten;
    link.expirationDate = new Date();
    link.expirationDate.setHours(23, 59, 59);
    link.expirationDate.setDate(link.expirationDate.getDate() + 1);
    link.active = true;
    this.linkService.createLink(link).subscribe((createdLink: Link) => {
        let generatedLink = this.linkService.createShortLinkForExternalUser(createdLink);
        let message = `Twój krótki link to: ${generatedLink}`;
        this.clearLongLinkField();
        this.snackBar.open(message, '', {duration: 60000});
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error, '', {duration: 10000});
      });
  }

  private clearLongLinkField(): void {
    this.createLinkForm.reset({});
    this.createLinkForm.get('link').setErrors(null);
    this.createLinkForm.markAsUntouched();
  }
}
