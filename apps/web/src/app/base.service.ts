import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorResponse } from '@typeorm';

interface IError extends HttpErrorResponse {
  error: ErrorResponse
}

@Injectable()
export class BaseService {

  constructor(protected readonly http: HttpClient) { }

  protected handleError(error: IError) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    return throwError(() => error.error);
  }

  protected buildQueryOptions<T extends object>(queryOptions: T): HttpParams {
    let params = new HttpParams();

    Object.entries(queryOptions).forEach(([key, value]) => {
      if (typeof value === 'object') {
        params = params.set(key, JSON.stringify(value));
      } else if (value instanceof Date) {
        params = params.set(key, value.toISOString());
      } else {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
