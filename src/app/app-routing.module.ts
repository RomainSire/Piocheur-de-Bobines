import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from "./components/movies-list/movies-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { FourOhFourComponent } from "./components/four-oh-four/four-oh-four.component";

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'tendance/:page', component: MoviesListComponent },
  { path: 'genre/:genre/:page', component: MoviesListComponent },
  { path: 'search/:term/:page', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '404', component: FourOhFourComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
