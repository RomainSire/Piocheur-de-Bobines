import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public pageBaseUri: string;
  public pageTitle: string;
  private genreCorrespondance = [
    { id: 28, name: "Action" },
    { id: 12, name: "Aventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comédie" },
    { id: 18, name: "Drame" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science-Fiction" },
    { id: 53, name: "Thriller" },
    { id: 37, name: "Western" },
  ];
  public searchMovieForm: FormGroup

  constructor(
    private tmdbService: TMDBService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // initialisation du formulaire de recherche de film
    this.initSearchMovieForm();
    // subscribe() pour recharger le composant à chaque changement de paramètres d'url
    this.route.params.subscribe(params => {
      // Numéro de page afficher
      this.page = +params.page ? +params.page : 1;
      // Détermination de ce qu'on veut afficher: tendances ou films par genre
      if (params.genre) {
        // AFFICHAGE DES GENRES
        this.pageTitle = params.genre;
        this.pageBaseUri = `/genre/${params.genre}/`;
        const genre = this.genreCorrespondance.find(genre => genre.name === params.genre);
        if (!genre) {
          this.router.navigate(['']);
        }
        const url = `${environment.databaseUrl}/discover/movie?api_key=${environment.APIKey}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}&with_genres=${genre.id}`;
        this.getMovieList(url);
      } else if (params.term) {
        // AFFICHAGE DE LA RECHERCHE
        this.pageTitle = `Recherche : ${params.term.split('%20').join(' ')}`;
        this.pageBaseUri = `/search/${params.term}/`;
        const url = `${environment.databaseUrl}/search/movie?api_key=${environment.APIKey}&language=fr&query=${params.term}&page=${this.page}&include_adult=false`;  
        this.getMovieList(url);
        
      } else {
        // AFFICHAGE DES TENDANCES
        this.pageTitle = "Tendances";
        this.pageBaseUri = `/tendance/`;
        const url = `${environment.databaseUrl}/trending/movie/week?api_key=${environment.APIKey}&language=fr&page=${this.page}`;
        this.getMovieList(url);
      }
      
    });
  }
  /**
   * Récupère la liste de films que l'on souhaite afficher
   * @param url URL The Movie DataBase que l'on souhaite requeter
   */
  private getMovieList(url: string): void {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    this.tmdbService.getMoviesList(url)
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
  /**
   * Définit la pagination à afficher en bas de la page
   */
  private setPageNumber(): void {
    const minPage = this.page-5 < 1 ? 1 : this.page-5;
    const maxPage = this.page+5 > this.totalPages ? this.totalPages : this.page+5;
    this.pageNumbers = [];
    for (let i = minPage; i < maxPage+1; i++) {
      this.pageNumbers.push(i);      
    }
  }
  /**
   * Recherche d'un film : initialisation du formulaire
   */
  private initSearchMovieForm(): void {
    this.searchMovieForm = this.formBuilder.group({
      searchTerm: ['', [Validators.required]]
    });
  }
  /**
   * Recherche d'un film : soumission du formulaire
   */
  public onSearchSubmit(): void {
    const { searchTerm } = this.searchMovieForm.value;
    const term = searchTerm.split(' ').join('%20');
    this.router.navigate([`/search/${term}/1`]);
  }
}
