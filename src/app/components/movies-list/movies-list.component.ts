import { Component, OnInit } from '@angular/core';
import { TMDBService } from "../../services/tmdb.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(
    private tmdbService: TMDBService
  ) { }

  ngOnInit(): void {
    this.getPopularMovies();
  }

  private getPopularMovies() {
    this.tmdbService.getMoviesList(`${environment.databaseUrl}/trending/movie/week?api_key=${environment.APIKey}&language=fr&page=1`)
    .subscribe(
      (response: any) => {        
        console.log(response);
      }
    )
  }

}
