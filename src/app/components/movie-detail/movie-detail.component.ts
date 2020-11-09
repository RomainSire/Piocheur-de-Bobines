import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { TMDBService } from "../../services/tmdb.service";

import { movieDetails } from "../../interfaces/movieDetails.interface";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: movieDetails;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getMovieDetail(id);
    })
  }

  private getMovieDetail(id:number) {
    this.tmdbService.getMovieDetail(id)
      .subscribe((response: movieDetails) => {
        if (response.error) {
          console.log("Erreur: impossible de charger le film");
        } else {
          this.movie = response;
          console.log(this.movie);
          
        }
      })
  }

  public onGoBack() {
    this.location.back();
  }
}
