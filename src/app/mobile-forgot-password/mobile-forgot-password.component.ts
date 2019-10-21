import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageUsersAccountService} from '../services/manage-users-account.service';

@Component({
  selector: 'app-mobile-forgot-password',
  templateUrl: './mobile-forgot-password.component.html',
  styleUrls: ['./mobile-forgot-password.component.scss']
})
export class MobileForgotPasswordComponent implements OnInit {

  config: any;
  emailSubmitted = false;
  recoverSubmitted = false;
  emailForm: FormGroup;
  recoverForm: FormGroup;
  verified = false;
  verificationCodeFocus = false;
  givenEmail = '';
  firstEmailSent = false;
  emailFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;
  passValidLength = false;
  passContainsNumber = false;
  passContainsCapital = false;
  passMatch = false;
  showPass = false;
  showConfirmPass = false;

  constructor(
    private _snackBar: MatSnackBar,
    private emailFormBuilder: FormBuilder,
    private resetFormBuilder: FormBuilder,
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
  }

  ngOnInit() {
    this.emailForm = this.emailFormBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.recoverForm = this.resetFormBuilder.group({
      code: [''],
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

  get validateEmailForm() { return this.emailForm.controls; }

  get validateRecoverForm() { return this.recoverForm.controls; }

  checkBorderColumn(field: string) {
    switch (field) {
      case 'email':
        if (this.emailSubmitted && this.validateEmailForm.email.errors) {
          return 'red';
        } else if (this.emailFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;

      case 'password':
        if (this.recoverSubmitted && this.validateRecoverForm.password.errors) {
          return 'red';
        } else if (this.passwordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;

      case 'confirmPassword':
        if (this.recoverSubmitted && this.validateRecoverForm.confirmPassword.errors) {
          return 'red';
        } else if (this.confirmPasswordFocused) {
          return 'rgb(23, 133, 184)';
        } else {
          return 'rgb(162, 164, 167)';
        }
        break;
    }
  }

  checkActivationCode(code: any) {
    return;
    // // To Do : Check if response returns right or wrong response code
    // this._accountService.verifyCode(code).pipe().subscribe(response => {
    //   if (response.code === 200) {
    //     // console.log(item);
    //   } else {
    //     // console.log(item);
    //   }
    //
    //   this.verified = true;
    // });
  }

  sendCode(email: string) {

    this.emailSubmitted = true;

    if (this.emailForm.invalid) {
      return;
    }

    // const response = this._utils.sendRecoveryEmail(this.forgotPassForm.controls.email.value);

    this._accountService.sendRecoveryCode(email).pipe().subscribe(response => {

      // if (response.code === 200) {
      //
      // } else {
      //
      // }

      this.firstEmailSent = true;
      this.givenEmail = email;

      this._snackBar.open('Verification code was sent to your email!', '', {
        duration: 2000,
        panelClass: ['mobile-blue-snackbar']
      });
    });
  }

  resetPassword() {
    this.recoverSubmitted = true;

    if (this.recoverForm.invalid || !this.passMatch) { //  || !this.verified
      return;
    }

    this._accountService.verifyRecoveryCode(
      this.givenEmail, this.recoverForm.controls.code.value, this.recoverForm.controls.password.value
    ).pipe().subscribe(response => {
      console.log(response);

      const snack =  this._snackBar.open('Password was updated successfully!', '', {
        duration: 2000,
        panelClass: ['mobile-blue-snackbar']
      });

      snack.afterDismissed().pipe().subscribe(item => {
        this.router.navigateByUrl('/login');
      });
    });

    // const response = this._utils.sendRecoveryEmail(this.emailForm.controls.email.value);
    //
    // if (response.responseCode === 200) {
    //   this._snackBar.open(response.message, '', {
    //     duration: 2000,
    //   });
    // } else {
    //   this._snackBar.open(response.message, '', {
    //     duration: 2000,
    //   });
    // }
  }

  validatePassword() {
    if (/\d/.test(this.recoverForm.controls.password.value)) {
      this.passContainsNumber = true;
    } else {
      this.passContainsNumber = false;
    }

    const re = /.*[A-Z].*/;
    if (re.test(this.recoverForm.controls.password.value)) {
      this.passContainsCapital = true;
    } else {
      this.passContainsCapital = false;
    }

    if (this.recoverForm.controls.password.value.length >= 6) {
      this.passValidLength = true;
    } else {
      this.passValidLength = false;
    }
  }

  passwordMatches() {
    if (this.recoverForm.controls.confirmPassword.value === this.recoverForm.controls.password.value
      && this.recoverForm.controls.password.value !== '') {
      this.passMatch = true;
    } else {
      this.passMatch = false;
    }
  }
}
