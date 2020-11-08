import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TMDBMovieList } from "../interfaces/tmdbMovieList.interface";

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMoviesList(url: string): Observable<TMDBMovieList> {
    return this.httpClient.get(url)
      .pipe(catchError(err => {
        return of(err);
      }))
  }
}