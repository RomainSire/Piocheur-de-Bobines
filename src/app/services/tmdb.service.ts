import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TMDBMovieList } from '../interfaces/tmdbMovieList.interface';
import { MovieDetails } from '../interfaces/movieDetails.interface';
import { environment } from '../../environments/environment';

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
      }));
  }

  public getMovieDetail(id: number): Observable<MovieDetails> {
    const url = `${environment.databaseUrl}/movie/${id}?api_key=${environment.APIKey}&language=fr`;
    return this.httpClient.get(url)
      .pipe(catchError(err => {
        return of(err);
      }));
  }
}
