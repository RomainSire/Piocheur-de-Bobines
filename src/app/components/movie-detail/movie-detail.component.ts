import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
  public trailerPath: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbService: TMDBService,
    private loaderService: LoaderService,
    private location: Location,
    private sanitizer: DomSanitizer
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
          console.log(this.movie);
          if (response.videos.results.length > 0) {
            const trailersArray = response.videos.results.filter(trailer => trailer.type === 'Trailer');
            if (trailersArray.length > 0) {
              this.trailerPath = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${trailersArray[0].key}`);
            }
          }
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
