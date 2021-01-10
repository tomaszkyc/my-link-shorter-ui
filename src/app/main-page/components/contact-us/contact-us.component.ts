import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ContactFormDto} from "./models/contact-form-dto";
import {ContactFormService} from "./services/contact-form.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private contactFormService: ContactFormService,
              private snackBar: MatSnackBar) {
    this.contactUsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactUsForm.valid) {
      this.sendContactForm();
    }
  }

  sendContactForm(): void {
    let contactFormDto = this.buildContactFormDto();
    this.contactFormService.sendContactFormDto(contactFormDto).subscribe((result: string) => {
      this.snackBar.open(result, '', {duration: 5000});
      this.clearForm();
    },
      (error: HttpErrorResponse) => {
      let errorMessage = error.error;
      this.snackBar.open(errorMessage, '', {duration: 5000});
      this.clearForm();
      });
  }

  buildContactFormDto(): ContactFormDto {
    let contactFormDto = new ContactFormDto();
    contactFormDto.name = this.contactUsForm.get('name').value;
    contactFormDto.email = this.contactUsForm.get('email').value;
    contactFormDto.message = this.contactUsForm.get('message').value;
    return contactFormDto;
  }

  clearForm(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 100);
  }
}
