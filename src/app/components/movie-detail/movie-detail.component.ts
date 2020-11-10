import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TMDBService } from '../../services/tmdb.service';
import { LoaderService } from '../../services/loader.service';

import { MovieDetails } from '../../interfaces/movieDetails.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TMDBService,
    private loaderService: LoaderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getMovieDetail(id);
    });
  }

  private getMovieDetail(id: number): void {
    this.loaderService.hidden = false;
    this.tmdbService.getMovieDetail(id)
      .subscribe((response: MovieDetails) => {
        if (response.error) {
          this.router.navigate([`/404`]);
        } else {
          this.movie = response;
        }
        window.setTimeout(() => {
          this.loaderService.hidden = true;
        }, 200);
      });
  }

  public onGoBack(): void {
    this.location.back();
  }
}
