import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../services/utils/utils.service';

@Component({
  selector: 'app-mobile-forgot-password',
  templateUrl: './mobile-forgot-password.component.html',
  styleUrls: ['./mobile-forgot-password.component.scss']
})
export class MobileForgotPasswordComponent implements OnInit {

  config: any;
  submitted = false;
  forgotPassForm: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    private _utils: UtilsService
  ) {
    this._fuseConfigService.getConfig().pipe().subscribe(item => {
      this.config = item;
      this.config.layout.toolbar.hidden = true;
    });
  }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get validateForm() { return this.forgotPassForm.controls; }

  recoverPassword() {
    this.submitted = true;

    if (this.forgotPassForm.invalid) {
      return;
    }

    const response = this._utils.sendRecoveryEmail(this.forgotPassForm.controls.email.value);

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
}
