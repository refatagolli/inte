import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageUsersAccountService} from '../services/manage-users-account.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  config: any;
  submitted = false;
  isIntelypro = false;
  emailFocused = false;
  passwordFocused = false;
  showPass = false;
  passContainsNumber = false;
  passContainsCapital = false;
  passValidLength = false;
  defaultEmail = '';
  loginForm: FormGroup;

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

    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     this.facilityName = params['facility'];
    //     this.defaultEmail = params['email'];
    //
    //     if (this.defaultEmail !== '' && this.defaultEmail !== undefined) {
    //       this.isIntelypro = true;
    //     }
    //   });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.defaultEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get validateForm() { return this.loginForm.controls; }

  checkBorderColumn(field: string) {
    switch (field) {
      case 'email':
        if (this.submitted && this.validateForm.email.errors) {
          return 'red';
        } else if (this.emailFocused) {
          return 'rgb(23, 133, 184)';
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

    }
  }

  validatePassword() {
    if (/\d/.test(this.loginForm.controls.password.value)) {
      this.passContainsNumber = true;
    } else {
      this.passContainsNumber = false;
    }

    const re = /.*[A-Z].*/;
    if (re.test(this.loginForm.controls.password.value)) {
      this.passContainsCapital = true;
    } else {
      this.passContainsCapital = false;
    }

    if (this.loginForm.controls.password.value.length >= 6) {
      this.passValidLength = true;
    } else {
      this.passValidLength = false;
    }
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this._accountService.login(
      this.loginForm.controls.email.value, this.loginForm.controls.password.value
    ).pipe().subscribe(response => {

      // if (response.code === 200) {
      //
      // } else {
      //
      // }

      this.router.navigateByUrl('/online');
    });

    // const response = this._utils.checkCredentials(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }
}
