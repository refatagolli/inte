import {Component, OnInit} from '@angular/core';
import {FuseConfigService} from '@theme/services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../services/utils/utils.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-manage-mobile-user',
  templateUrl: './manage-mobile-user.component.html',
  styleUrls: ['./manage-mobile-user.component.scss']
})
export class ManageMobileUserComponent implements OnInit {

  config: any;
  submitted = false;
  registerForm: FormGroup;
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
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get validateForm() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
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
}
