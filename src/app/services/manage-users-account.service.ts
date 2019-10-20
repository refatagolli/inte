import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
const api = environment.SERVER_URI;

@Injectable({
  providedIn: 'root'
})
export class ManageUsersAccountService {

  constructor() { }

  checkUrl() {
    console.log(api);
  }
}
