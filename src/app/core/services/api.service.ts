import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Document} from "../../features/documents/document-list/document-list.component";

@Injectable({ providedIn: 'root' })
export class ApiService {

  private host = 'http://127.0.0.1/';
  private documentsUrl = this.host + 'api/documents';
  private documentUrl = this.host + 'api/document';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.documentsUrl)
      .pipe(
        tap(_ => this.log('fetched documents')),
        catchError(this.handleError<Document[]>('getDocuments', []))
      );
  }

  // /** POST: add a new hero to the server */
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.documentUrl, hero, this.httpOptions).pipe(
  //     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
  //
  // /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<Hero> {
  //   const url = `${this.documentUrl}/${id}`;
  //
  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }

  getDocument(id: string | null) {
    return this.http.get<any>(this.documentUrl + '/' + id)
        .pipe(
            tap(_ => this.log('fetched document')),
            catchError(this.handleError<any>('getDocument', {}))
        );
  }

  create(file: any) {
    return this.http.post(this.documentUrl, file);
  }
}
