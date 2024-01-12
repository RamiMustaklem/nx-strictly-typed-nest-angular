import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class BaseService {

  constructor(protected readonly http: HttpClient) { }

  protected buildQueryOptions<T extends Object>(queryOptions: T): HttpParams {
    let params = new HttpParams();

    Object.entries(queryOptions).forEach(([key, value]) => {
      if (typeof value === 'object') {
        params = params.set(key, JSON.stringify(value));
      } else {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
