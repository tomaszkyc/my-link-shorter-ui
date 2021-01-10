import {Component, OnInit, ViewChild} from '@angular/core';
import {UserDtoService} from "../../services/user-dto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../models/user-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {UserAuthorityDto} from "../../models/user-authority-dto";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userDto: UserDto;
  dataFetched: boolean = false;
  userAuthorities: UserAuthorityDto[];

  editUserForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private userDtoService: UserDtoService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.editUserForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, [Validators.required]),
      username: new FormControl('', [Validators.required]),
      enabled: new FormControl('', []),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      userAuthorities: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      let id = params.id;
      this.getUser(id);
    });
    this.userAuthorities = UserAuthorityDto.generateValues();
  }

  getUser(id: string): void {
    this.userDtoService.getUser(id).subscribe((userDto: UserDto) => {
        this.userDto = userDto;
        this.dataFetched = true;
        this.setEditUserForm(userDto);
      },
      (error: HttpErrorResponse) => {
        let errorMessage = 'Wystąpił błąd podczas pobierania danych użytkownika: ' + error.error
        console.log(errorMessage);
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  setEditUserForm(userDto: UserDto): void {
    this.editUserForm.get('id').setValue(userDto.id);
    this.editUserForm.get('username').setValue(userDto.username);
    this.editUserForm.get('enabled').setValue(userDto.enabled);
    this.editUserForm.get('fullName').setValue(userDto.fullName);
    this.editUserForm.get('email').setValue(userDto.email);
    this.editUserForm.patchValue({
      'userAuthorities': userDto.userAuthorities
    });
  }

  compareUserAuthorityDtos(s1: UserAuthorityDto, s2: UserAuthorityDto): boolean {
    return s1 && s2 ? s1.authority == s2.authority : s1 === s2;
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      this.saveUserDetails();
    }
  }

  saveUserDetails(): void {
    let userDto = this.buildUserDtoFromForm();
    this.userDtoService.updateUser(userDto).subscribe(result => {
      this.snackBar.open('Użytkownik pomyślnie zaktualizowany', '', {duration: 5000});
      this.router.navigate(['/app/users']);
    },
      (error: HttpErrorResponse) => {
        let errorMessage = `Wystąpił błąd podczas aktualizacji użytkownika ${userDto.id}: ${error.error}`;
        console.error(errorMessage);
        this.snackBar.open(errorMessage, '', {duration: 5000});
      });
  }

  goBackToUsersPage(): void {
    this.router.navigate(['/app/users']);
  }

  private buildUserDtoFromForm(): UserDto {
    console.log('buildUserDtoFromForm start');
    let userDto = new UserDto();
    userDto.id = this.editUserForm.get('id').value;
    userDto.username = this.editUserForm.get('username').value;
    userDto.enabled = this.editUserForm.get('enabled').value;
    userDto.fullName = this.editUserForm.get('fullName').value;
    userDto.email = this.editUserForm.get('email').value;
    let userAuthorityValueFromForm = this.editUserForm.get('userAuthorities').value;
    //let parsedUserAuthorityDto = UserAuthorityDto.parseMultiple( userAuthorityValueFromForm );
    userDto.userAuthorities = userAuthorityValueFromForm;
    return userDto;
  }
}
