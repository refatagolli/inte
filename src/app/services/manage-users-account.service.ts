import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Response} from '../models/Response';
const api = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ManageUsersAccountService {

  constructor(private http: HttpClient) { }

  retrieveStaffMemberData(registrationlinkid: number) {
    return this.http.get<Response>(api + '/user/registrationlink?registrationlinkid=' + registrationlinkid);
  }

  saveStaffMemberAccount(registrationLinkId: number, email: string, password: string) {
    const requestBody = {
      'registrationlinkid': registrationLinkId,
      'email': email,
      'password': password,
      'frommobile': false,
      'fromemail': true
    };

    return this.http.post<Response>(api + '/user/signup', requestBody);
  }

  resendActivationCode() {
    return this.http.post<Response>(api + '/user/activate/newemailcode', null);
  }

  verifyCode(code: string) {
    const requestBody = {
      'code': code
    };

    return this.http.post<Response>(api + '/user/activate/fromemailcode', requestBody);
  }

  sendRecoveryCode(email: string) {
    const requestBody = {
      'email': email
    };

    return this.http.post<Response>(api + '/user/password/reset/requestemailcode', requestBody);
  }

  verifyRecoveryCode(code: string, email: string, password: string) {
    const requestBody = {
      'email': email,
      'code': code,
      'newpassword': password
    };

    return this.http.post<Response>(api + '/user/password/reset/fromemailcode', requestBody);
  }

  login(email: string, password: string) {
    const requestBody = {
      'serviceid': 1,
      'email': email,
      'password': password
    }

    return this.http.post<Response>(api + '/user/logon', requestBody);
  }
  
}
