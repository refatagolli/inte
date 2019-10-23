import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomResponse} from '../models/CustomResponse';
import {BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
const api = environment.BASE_URL;
const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Expose-Headers': 'Set-Cookie',
  //   // 'Access-Control-Allow-Credentials': 'true',
  //   'Access-Control-Allow-Origin': 'http://localhost:4222',
  //   'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin',
  // }),
  withCredentials: true,
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class ManageUsersAccountService {

  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public set setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  retrieveStaffMemberData(registrationlinkid: number) {
    const requestBody = {
      'registrationlinkid': registrationlinkid
    };

    return this.http.post<CustomResponse>(api + '/user/get/registrationlink', requestBody);
  }

  saveStaffMemberAccount(registrationLinkId: number, email: string, password: string) {
    const requestBody = {
      'registrationlinkid': registrationLinkId,
      'email': email,
      'password': password,
      'frommobile': false,
      'fromemail': true
    };

    return this.http.post<CustomResponse>(api + '/user/signup', requestBody).pipe(tap(response => {
      console.log(response);
      if (response.code === 200) {
        this.getPayLoad();
      }
    }));
  }

  resendActivationCode() {
    return this.http.post<CustomResponse>(api + '/user/activate/newemailcode', null);
  }

  verifyCode(code: string) {
    const requestBody = {
      'code': code
    };

    return this.http.post<CustomResponse>(api + '/user/activate/fromemailcode', requestBody);
  }

  sendRecoveryCode(email: string) {
    const requestBody = {
      'email': email
    };

    return this.http.post<CustomResponse>(api + '/user/password/reset/requestemailcode', requestBody);
  }

  verifyRecoveryCode(code: string, email: string, password: string) {
    const requestBody = {
      'email': email,
      'code': code,
      'newpassword': password
    };

    return this.http.post<CustomResponse>(api + '/user/password/reset/fromemailcode', requestBody);
  }

  login(email: string, password: string) {
    const requestBody = {
      'serviceid': 1,
      'email': email,
      'password': password
    };

    return this.http.post<Response>(api + '/user/logon', requestBody, httpOptions).pipe(tap(response => {
      // console.log(response.headers.get('Set-Cookie')); // .get('Set-Cookie')
      // this.headerProperty = response.headers.get('property name here');
      console.log(response.body);

      // console.log("call");
      // const a = this.getPayLoad();
      //
      // a.subscribe(response2 => {
      //   console.log("subs");
      //   console.log('a', response2);
      // });

      // if (response.body.code === 201) {
      //   const a = this.getPayLoad();
      //
      //   a.subscribe(response2 => {
      //     console.log('a', response2);
      //   });
      //   // console.log('a', a);
      // }
    }));
  }
// ?registrationlinkid=
  getPayLoad() {
    console.log(1);
    return this.http.get<CustomResponse>(api + '/user/jwt/payload').pipe(tap(response => {
      console.log(response);
      // login successful if there's a jwt token in the response
      if (response.data != null && response.data.userid != null) {
        this.currentUserSubject.next(response.data);
      }
      return response;
    }));
  }

}
