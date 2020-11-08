import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TMDBService } from "../../services/tmdb.service";
import { environment } from '../../../environments/environment';

import { TMDBMovieList } from "../../interfaces/tmdbMovieList.interface";
import { movie } from "../../interfaces/movie.interface";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public movies: [movie];
  public page = 1;
  public pageNumbers= [];
  public totalPages: number;

  constructor(
    private tmdbService: TMDBService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // subscribe() pour recharger le composant à chaque changement de paramètres d'url
    this.route.params.subscribe(params => {
      this.page = +params.page ? +params.page : 1;
      this.getPopularMovies();
    });
  }

  private getPopularMovies(): void {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    this.tmdbService.getMoviesList(`${environment.databaseUrl}/trending/movie/week?api_key=${environment.APIKey}&language=fr&page=${this.page}`)
    .subscribe((response: TMDBMovieList) => {
      if (response.error) {
        console.log("Erreur: impossible de charger la liste de films");
      } else {
        this.totalPages = response.total_pages;
        this.movies = response.results;
        this.setPageNumber();
        loader.classList.add('hidden');
      }
    })
  }
  private setPageNumber(): void {
    const minPage = this.page-5 < 1 ? 1 : this.page-5;
    const maxPage = this.page+5 > this.totalPages ? this.totalPages : this.page+5;
    this.pageNumbers = [];
    for (let i = minPage; i < maxPage; i++) {
      this.pageNumbers.push(i);      
    }
  }
}
