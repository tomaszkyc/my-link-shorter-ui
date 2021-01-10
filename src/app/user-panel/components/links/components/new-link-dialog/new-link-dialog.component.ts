import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Link} from "../../../../../shared/link/models/link";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../shared/security/services/auth.service";
import {LinkValidationService} from "../../../../../shared/link/services/link-validation.service";

@Component({
  selector: 'app-new-link-dialog',
  templateUrl: './new-link-dialog.component.html',
  styleUrls: ['./new-link-dialog.component.scss']
})
export class NewLinkDialogComponent implements OnInit {
  newLinkForm: FormGroup;
  minDate: Date;
  private validUrlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private dialogRef: MatDialogRef<NewLinkDialogComponent>,
              private authService: AuthService) {
    this.newLinkForm = new FormGroup({
      shortLink: new FormControl('', []),
      longLink: new FormControl('', [Validators.required, LinkValidationService.isShortLinkAlreadyShortened]),
      expirationDate: new FormControl(new Date(), [Validators.required]),
      active: new FormControl(true, [])
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {

  }

  createLink(): void {
    console.log(this.newLinkForm);
    if (this.newLinkForm.valid) {
      console.log('Formularz jest poprawny');
      let link: Link = this.buildLinkFromForm();
      this.dialogRef.close(link);
    } else {
      console.log('Formularz nie jest poprawny');
      this.validateAllFormFields(this.newLinkForm);
    }
  }

  buildLinkFromForm(): Link {
    let link: Link = new Link();
    link.shortLink = this.newLinkForm.get('shortLink').value;
    link.longLink = this.newLinkForm.get('longLink').value;
    link.expirationDate = this.newLinkForm.get('expirationDate').value;
    link.active = this.newLinkForm.get('active').value;
    link.expirationDate.setHours(23, 59, 59);
    return link;
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  hasAnyAuthority(authorities: string[]): boolean {
    let hasAnyAuthority = this.authService.getCurrentUser().hasAnyAuthority(authorities);
    return hasAnyAuthority;
  }
}
