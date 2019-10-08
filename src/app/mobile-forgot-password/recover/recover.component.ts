import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  config: any;
  submitted = false;
  token: string;
  recoverForm: FormGroup;
  facilityName: string;
  email: string;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private _fuseConfigService: FuseConfigService,
    private _utils: UtilsService
  ) {
    this._fuseConfigService.getConfig().pipe().subscribe(item => {
      this.config = item;
      this.config.layout.toolbar.hidden = true;
    });
  }

  ngOnInit() {
    this.recoverForm = this.formBuilder.group({
      pass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.token = params['token'];
        this.facilityName = params['facility'];
        this.email = params['email'];
      });
  }

  get validateForm() { return this.recoverForm.controls; }

  reccover() {
    this.submitted = true;

    if (this.recoverForm.invalid) {
      return;
    }

    if (this.token === '' || this.token === undefined) {
      this._snackBar.open('Link to recover your password is not correct', '', {
        duration: 2000,
      });

      return;
    }

    if (this.recoverForm.controls.pass.value !== this.recoverForm.controls.confirmPass.value) {
      this._snackBar.open('Passwords do not match!', '', {
        duration: 2000,
      });

      return;
    }

    const response = this._utils.recoverPassword(this.token, this.recoverForm.controls.pass.value);

    if (response.responseCode === 200) {
      const snackSuccess = this._snackBar.open(response.message, '', {
        duration: 2000,
      });

      snackSuccess.afterDismissed().subscribe(() => {
        this.router.navigate(['/login'], {queryParams: {facility : this.facilityName, email: this.email}});
      });
    } else {
      this._snackBar.open(response.message, '', {
        duration: 2000,
      });
    }
  }

}
