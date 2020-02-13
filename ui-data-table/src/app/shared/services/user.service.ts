import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';
import {DataTableQuery} from '../models/data-table-query.model';

@Injectable()

export class UserService {

  constructor(private httpClient: HttpClient) {}

  // fetch users and userCount from api passing in filter query

  getUsers(dataTableQuery: DataTableQuery): Observable<any> {
    const httpParams = new HttpParams({fromObject: {...dataTableQuery}});
    return this.httpClient.get(`${environment.apiUrl}/user`, {
      observe: 'body',
      params: httpParams
    });
  }
}
