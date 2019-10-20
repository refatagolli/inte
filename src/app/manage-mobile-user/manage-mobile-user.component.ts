import {Component, OnInit} from '@angular/core';
import {FuseConfigService} from '@theme/services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../services/utils/utils.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
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
  givenEmail = ''; // emanuel
  registrationlinkid: number;
  facilityName = '';
  staffName = 'Test';
  showPass = false;
  showConfirmPass = false;
  passValidLength = false;
  passContainsNumber = false;
  passContainsCapital = false;
  passMatch = false;
  validPass = false;
  emailFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    _accountService.checkUrl();
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
  }

  get validateForm() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid || !this.passMatch) {
      return;
    }

    const response = this._utils.registerUser(this.registerForm.controls.email.value, this.registerForm.controls.password.value);

    if (response.responseCode === 200) {
      this._snackBar.open(response.message, '', {
        duration: 2000,
      });
    } else {
      this._snackBar.open(response.message, '', {
        duration: 2000,
      });
    }
  }

  checkBorderColumn(field: string) {
    switch (field) {
      case 'email':
        if (this.submitted && this.validateForm.email.errors) {
          return 'red';
        } else if (this.emailFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return '';
        }
        break;

      case 'password':
        if (this.submitted && this.validateForm.password.errors) {
          return 'red';
        } else if (this.passwordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return '';
        }
        break;

      case 'confirmPassword':
        if (this.submitted && this.validateForm.confirmPassword.errors) {
          return 'red';
        } else if (this.confirmPasswordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return '';
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
}
