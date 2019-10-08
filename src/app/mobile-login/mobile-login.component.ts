import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../services/utils/utils.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  config: any;
  submitted = false;
  isIntelypro = false;
  defaultEmail = '';
  loginForm: FormGroup;
  facilityName = '';

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _fuseConfigService: FuseConfigService,
    private _utils: UtilsService
  ) {
    this._fuseConfigService.getConfig().pipe().subscribe(item => {
      this.config = item;
      this.config.layout.toolbar.hidden = true;
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.facilityName = params['facility'];
        this.defaultEmail = params['email'];

        if (this.defaultEmail !== '' && this.defaultEmail !== undefined) {
          this.isIntelypro = true;
        }
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.defaultEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get validateForm() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const response = this._utils.checkCredentials(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

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
