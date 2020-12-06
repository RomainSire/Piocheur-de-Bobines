import { Component, Input } from '@angular/core';

import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent {
  @Input() movie: Movie;
}
