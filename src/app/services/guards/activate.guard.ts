import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ManageUsersAccountService } from '../manage-users-account.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: ManageUsersAccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;

      console.log(currentUser);

      if (currentUser && currentUser.activeuser) {
        return true;
      } else if (currentUser && !currentUser.activeuser) {
        this.router.navigate(['/activate'], { queryParams: { returnUrl: state.url }});
        return false;
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }
}
