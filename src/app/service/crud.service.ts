import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from './book';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  //Nodejs API
  REST_API: string = 'http://localhost:3000/api';
  //Set http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  //Book Starts
  //add
  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/book/`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  //get All books
  getBooks() {
    return this.httpClient.get(`${this.REST_API}/book/`);
  }

  //get one book
  getBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/category/:${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //Update Book
  UpdateBook(data: any, id: any): Observable<any> {
    let API_URL = `http://localhost:3000/api/book/:${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  //Delete Book
  DeleteBook(id: any): Observable<any> {
    let API_URL = `http://localhost:3000/api/book/:${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  //Error

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Handle client error
      errorMessage = error.error.message;
    } else {
      //handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  //Book ends
}
