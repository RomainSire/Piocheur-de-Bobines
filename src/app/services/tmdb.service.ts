import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMoviesList(url: string): any {
    return this.httpClient.get(url)
      .pipe(catchError(res => {
        return of([]);
      }))
  }

}
