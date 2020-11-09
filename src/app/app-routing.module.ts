import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from "./components/movies-list/movies-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'tendance/:page', component: MoviesListComponent },
  { path: 'genre/:genre/:page', component: MoviesListComponent },
  { path: 'search/:term/:page', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
