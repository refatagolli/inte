import {Component, OnInit} from '@angular/core';
import {FuseConfigService} from '@theme/services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../services/utils/utils.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageUsersAccountService} from '../services/manage-users-account.service';

@Component({
  selector: 'app-manage-mobile-user',
  templateUrl: './manage-mobile-user.component.html',
  styleUrls: ['./manage-mobile-user.component.scss']
})
export class ManageMobileUserComponent implements OnInit {

  config: any;
  submitted = false;
  registerForm: FormGroup;
  givenEmail = '';
  registrationlinkid: number;
  facilityName = '';
  staffFirstName = '';
  staffLastName = '';
  showPass = false;
  showConfirmPass = false;
  passValidLength = false;
  passContainsNumber = false;
  passContainsCapital = false;
  passMatch = false;
  emailFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _fuseConfigService: FuseConfigService,
    private _utils: UtilsService,
    private _accountService: ManageUsersAccountService
  ) {
    this._fuseConfigService.getConfig().pipe().subscribe(item => {
      this.config = item;
      this.config.layout.toolbar.hidden = true;
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.registrationlinkid = params['registrationlinkid'];
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}')
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}')
      ]]
    });

    this.getStaffData();
  }

  get validateForm() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid || !this.passMatch) {
      return;
    }

    // const response = this._utils.registerUser(this.registerForm.controls.email.value, this.registerForm.controls.password.value);

    this._accountService.saveStaffMemberAccount(
      this.registrationlinkid, this.registerForm.controls.email.value, this.registerForm.controls.password.value
    ).pipe().subscribe(response => {

      // if (response.code === 200) {
      //
      // } else {
      //
      // }

      const snackBar = this._snackBar.open('Your account was created successfully!', '', {
        duration: 2000,
        panelClass: ['mobile-blue-snackbar']
      });

      snackBar.afterDismissed().pipe().subscribe(val => {
        this.router.navigateByUrl('/activate');
      });
    });
  }

  checkBorderColumn(field: string) {
    switch (field) {
      case 'email':
        if (this.submitted && this.validateForm.email.errors) {
          return 'red';
        } else if (this.emailFocused) {
          return 'rgb(23, 133, 184)';
        } else if (this.givenEmail !== '') {
          return 'rgb(218, 220, 219)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;

      case 'password':
        if (this.submitted && this.validateForm.password.errors) {
          return 'red';
        } else if (this.passwordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;

      case 'confirmPassword':
        if (this.submitted && this.validateForm.confirmPassword.errors) {
          return 'red';
        } else if (this.confirmPasswordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;
    }
  }

  validatePassword() {
    if (/\d/.test(this.registerForm.controls.password.value)) {
      this.passContainsNumber = true;
    } else {
      this.passContainsNumber = false;
    }

    const re = /.*[A-Z].*/;
    if (re.test(this.registerForm.controls.password.value)) {
      this.passContainsCapital = true;
    } else {
      this.passContainsCapital = false;
    }

    if (this.registerForm.controls.password.value.length >= 6) {
      this.passValidLength = true;
    } else {
      this.passValidLength = false;
    }
  }

  passwordMatches() {
    if (this.registerForm.controls.confirmPassword.value === this.registerForm.controls.password.value
      && this.registerForm.controls.password.value !== '') {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }

  getStaffData() {
    this._accountService.retrieveStaffMemberData(this.registrationlinkid).pipe().subscribe(item => {
      this.givenEmail = item.data.email;
      // this.givenEmail = 'emanuel_idrizi@hotmail.com';
      this.registerForm.controls.email.patchValue(this.givenEmail);
      this.staffFirstName = item.data.firstname;
      this.staffLastName = item.data.lastname;
      this.facilityName = item.data.clientname;
    });
  }
}
