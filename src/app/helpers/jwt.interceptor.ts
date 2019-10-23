import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ManageUsersAccountService} from '../services/manage-users-account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private manageUsersAccountService: ManageUsersAccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(1);
        // add authorization header with jwt token if available
        const currentUser = this.manageUsersAccountService.currentUserValue;

        // if (currentUser) {
        //   console.log('int');
            request = request.clone({
                setHeaders: {
                  // IntelycareAuthCookie: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjU2LCJpcCI6IjE3Mi4zMS4yNi4yMCIsInVzZXJ0eXBlcyI6bnVsbCwiYWN0aXZlIjpmYWxzZSwiand0Y3JlYXRlZCI6IjIwMTktMTAtMjJUMTk6NDQ6NTEuNzYyNzA3OTg3WiIsInVzZXJhdXRoZW50aWNhdGlvbmlkIjowfQ==.Gh6Pl5VzhSBu+CiGZvIB+GAiNCmH2uGRoj4F/I6MABk=',
                  // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjU2LCJpcCI6IjE3Mi4zMS4yNi4yMCIsInVzZXJ0eXBlcyI6bnVsbCwiYWN0aXZlIjpmYWxzZSwiand0Y3JlYXRlZCI6IjIwMTktMTAtMjJUMTk6NDQ6NTEuNzYyNzA3OTg3WiIsInVzZXJhdXRoZW50aWNhdGlvbmlkIjowfQ==.Gh6Pl5VzhSBu+CiGZvIB+GAiNCmH2uGRoj4F/I6MABk=',
                }
            });
        // }

        return next.handle(request);
    }
}
