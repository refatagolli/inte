import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseConfigService} from '@theme/services/config.service';
import {UtilsService} from '../services/utils/utils.service';
import {ManageUsersAccountService} from '../services/manage-users-account.service';

@Component({
  selector: 'app-activate-staff-account',
  templateUrl: './activate-staff-account.component.html',
  styleUrls: ['./activate-staff-account.component.scss']
})
export class ActivateStaffAccountComponent implements OnInit {

  config: any;
  code: string;
  registrationlinkid: number;
  verified = false;
  verificationCodeFocus = false;
  givenEmail = '';

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
    this.getStaffData();
  }

  getStaffData() {
    this._accountService.retrieveStaffMemberData(this.registrationlinkid).pipe().subscribe(item => {
      this.givenEmail = item.data.email;
    });
  }

  getNewCode() {
    // To Do : Check if response returns right or wrong response code
    this._accountService.resendActivationCode().pipe().subscribe(response => {
      if (response.code === 200) {
        // console.log(item);
      } else {
        // console.log(item);
      }

      this._snackBar.open('New code was sent to your email', '', {
        duration: 2000,
        panelClass: ['mobile-blue-snackbar']
      });
    });
  }

  checkActivationCode(code: any) {
    // To Do : Check if response returns right or wrong response code
    this._accountService.verifyCode(code).pipe().subscribe(response => {
      if (response.code === 200) {
        // console.log(item);
      } else {
        // console.log(item);
      }

      this.verified = true;

      const snackBar = this._snackBar.open('Your account is activated!', '', {
        duration: 2000,
        panelClass: ['mobile-blue-snackbar']
      });

      snackBar.afterDismissed().pipe().subscribe(val => {
        this.router.navigateByUrl('/online');
      });
    });
  }

}
