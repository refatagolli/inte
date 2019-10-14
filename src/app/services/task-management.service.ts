import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from '../models/BaseResponseModel';
import {UserTask} from '../models/UserTask';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  private _baseUri = `${environment.SERVER_URI}/TaskManagement/1.0.0/task`;
  private _request = {
    service: 'TestService'
  };

  constructor(private _http: HttpClient) {
  }

  getAllTasks(): Observable<UserTask[]> {
    return this._http.get<BaseResponseModel<UserTask[]>>(`${this._baseUri}/all`).pipe(map(e => e.data));
  }

  create(taskName: string) {
    const payload = {...this._request, taskname: taskName};
    return this._http.post(this._baseUri, payload);
  }

  completeTask(taskId) {
    const payload = {...this._request, taskid: taskId};
    return this._http.put(`${this._baseUri}/complete`, payload);
  }
}
