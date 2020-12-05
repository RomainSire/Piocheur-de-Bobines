import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TMDBService } from 'src/app/services/tmdb.service';
import { By } from "@angular/platform-browser";

import { MovieDetailComponent } from './movie-detail.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {provide: TMDBService, useValue: tbdbServiceStub},
        {provide: Location, useValue: locationStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Get Movie Detail', () => {
    it('should call getMovieDetail Method one on init', () => {
      spyOn<any>(component, 'getMovieDetail');
      component.ngOnInit();
      expect(component['getMovieDetail']).toHaveBeenCalledTimes(1);
    });
  
    it('should get movie details when getMoviesDetail is called', () => {
      component['getMovieDetail'](340102);
      expect(component.movie.id).toBe(340102);
    })
  
    it('should go to 404 page if there is an error while calling getMovieDetail method', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component['getMovieDetail'](404);
      expect(navigateSpy).toHaveBeenCalledWith(['/404']);
    })

    it('should get movie details but without trailers when getMoviesDetail is called for a movie without trailer', () => {
      component['getMovieDetail'](12);
      expect(component.movie.id).toBe(12);
    })

    it('should get movie details but without videos when getMoviesDetail is called for a movie without videos', () => {
      component['getMovieDetail'](23);
      expect(component.movie.id).toBe(23);
    })

    it('should call a setTimeout() when getMovieDetails is called', () => {
      spyOn(window, 'setTimeout');
      component['getMovieDetail'](340102);
      expect(window.setTimeout).toHaveBeenCalled();
    })
  })
  
  describe('Go back', () => {
    it('should call the onGoBack method when link is clicked', () => {
      spyOn(component, 'onGoBack');
      const buttonElements = fixture.debugElement.queryAll(By.css('.main--gobackbtn'));
      for (let i = 0; i < buttonElements.length; i++) {
        const button = buttonElements[i];
        button.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(component.onGoBack).toHaveBeenCalledTimes(i+1);
      }
    })

    it('should navigate back when the onGoBack method is called', () => {
      component.onGoBack();
      const location = fixture.debugElement.injector.get(Location);
      expect((location as any).back).toBe("back called");
    })
  })


});


const tbdbServiceStub = {
  getMovieDetail(id: number) {
    console.log("L'ID DEMANDÉ EST LE: ", id);
    // si on envoie l'id 404, ça va envoyer une erreur...
    if (id === 404) {
      return of({error: 'Une erreur s\'est produite'})
    }

    // Si on a un film sans infos videos
    if (id === 23) {
      const movie = {
        "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
        "id": id,
        "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
        "release_date": "2020-08-26",
        "runtime": 98,
        "title": "Les Nouveaux mutants",
        "videos": {
          "results": []
        },
        "vote_average": 6.3
      };
      return of(movie)
    }

    // si on a une film avec les infos videos mais pas de trailer
    if (id === 12) {
      const movie = {
        "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
        "id": id,
        "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
        "release_date": "2020-08-26",
        "runtime": 98,
        "title": "Les Nouveaux mutants",
        "videos": {
          "results": [
            {
              "id": "5f40f032c175b200376847c2",
              "iso_639_1": "fr",
              "iso_3166_1": "FR",
              "key": "Phioh8YnTzk",
              "name": "Les Nouveaux Mutants - Spot ComicCon [VOST]",
              "site": "YouTube",
              "size": 1080,
              "type": "Teaser"
            },
            {
              "id": "5f460220fdc4fa0036bc33cb",
              "iso_639_1": "fr",
              "iso_3166_1": "FR",
              "key": "DNO2iYUsjcc",
              "name": "Les Nouveaux Mutants - Extrait [VF]",
              "site": "YouTube",
              "size": 1080,
              "type": "Clip"
            }
          ]
        },
        "vote_average": 6.3
      };
      return of(movie)
    }
    
    const movie = {
      "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
      "id": id,
      "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
      "release_date": "2020-08-26",
      "runtime": 98,
      "title": "Les Nouveaux mutants",
      "videos": {
        "results": [
          {
            "id": "5f40f032c175b200376847c2",
            "iso_639_1": "fr",
            "iso_3166_1": "FR",
            "key": "Phioh8YnTzk",
            "name": "Les Nouveaux Mutants - Spot ComicCon [VOST]",
            "site": "YouTube",
            "size": 1080,
            "type": "Teaser"
          },
          {
            "id": "5f40efd16a34480034b07a64",
            "iso_639_1": "fr",
            "iso_3166_1": "FR",
            "key": "6ZdL4M7JRCY",
            "name": "Les Nouveaux Mutants - Bande Annonce [VF]",
            "site": "YouTube",
            "size": 1080,
            "type": "Trailer"
          },
          {
            "id": "5f40f00e028f1400325f0264",
            "iso_639_1": "fr",
            "iso_3166_1": "FR",
            "key": "7dGuakoTaGw",
            "name": "Les Nouveaux Mutants - Bande Annonce [VOST]",
            "site": "YouTube",
            "size": 1080,
            "type": "Trailer"
          },
          {
            "id": "5f460220fdc4fa0036bc33cb",
            "iso_639_1": "fr",
            "iso_3166_1": "FR",
            "key": "DNO2iYUsjcc",
            "name": "Les Nouveaux Mutants - Extrait [VF]",
            "site": "YouTube",
            "size": 1080,
            "type": "Clip"
          }
        ]
      },
      "vote_average": 6.3
    };
    return of(movie)
    
    
    // const movie = {
    //   "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
    //   "id": id,
    //   "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
    //   "release_date": "2020-08-26",
    //   "runtime": 98,
    //   "title": "Les Nouveaux mutants",
    //   "videos": {
    //     "results": [
    //       {
    //         "id": "5f40f032c175b200376847c2",
    //         "iso_639_1": "fr",
    //         "iso_3166_1": "FR",
    //         "key": "Phioh8YnTzk",
    //         "name": "Les Nouveaux Mutants - Spot ComicCon [VOST]",
    //         "site": "YouTube",
    //         "size": 1080,
    //         "type": "Teaser"
    //       },
    //       {
    //         "id": "5f40efd16a34480034b07a64",
    //         "iso_639_1": "fr",
    //         "iso_3166_1": "FR",
    //         "key": "6ZdL4M7JRCY",
    //         "name": "Les Nouveaux Mutants - Bande Annonce [VF]",
    //         "site": "YouTube",
    //         "size": 1080,
    //         "type": "Trailer"
    //       },
    //       {
    //         "id": "5f40f00e028f1400325f0264",
    //         "iso_639_1": "fr",
    //         "iso_3166_1": "FR",
    //         "key": "7dGuakoTaGw",
    //         "name": "Les Nouveaux Mutants - Bande Annonce [VOST]",
    //         "site": "YouTube",
    //         "size": 1080,
    //         "type": "Trailer"
    //       },
    //       {
    //         "id": "5f460220fdc4fa0036bc33cb",
    //         "iso_639_1": "fr",
    //         "iso_3166_1": "FR",
    //         "key": "DNO2iYUsjcc",
    //         "name": "Les Nouveaux Mutants - Extrait [VF]",
    //         "site": "YouTube",
    //         "size": 1080,
    //         "type": "Clip"
    //       }
    //     ]
    //   },
    //   "vote_average": 6.3
    // };
    // return of(movie)

    // // si on a toutes les infos d'un film
    // if (id === 340102) {
    //   const movie = {
    //     "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
    //     "id": id,
    //     "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
    //     "release_date": "2020-08-26",
    //     "runtime": 98,
    //     "title": "Les Nouveaux mutants",
    //     "videos": {
    //       "results": [
    //         {
    //           "id": "5f40f032c175b200376847c2",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "Phioh8YnTzk",
    //           "name": "Les Nouveaux Mutants - Spot ComicCon [VOST]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Teaser"
    //         },
    //         {
    //           "id": "5f40efd16a34480034b07a64",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "6ZdL4M7JRCY",
    //           "name": "Les Nouveaux Mutants - Bande Annonce [VF]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Trailer"
    //         },
    //         {
    //           "id": "5f40f00e028f1400325f0264",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "7dGuakoTaGw",
    //           "name": "Les Nouveaux Mutants - Bande Annonce [VOST]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Trailer"
    //         },
    //         {
    //           "id": "5f460220fdc4fa0036bc33cb",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "DNO2iYUsjcc",
    //           "name": "Les Nouveaux Mutants - Extrait [VF]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Clip"
    //         }
    //       ]
    //     },
    //     "vote_average": 6.3
    //   };
    //   return of(movie)
    // }

    // // si on a une film avec les infos videos mais pas de trailer
    // if (id === 12) {
    //   const movie = {
    //     "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
    //     "id": id,
    //     "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
    //     "release_date": "2020-08-26",
    //     "runtime": 98,
    //     "title": "Les Nouveaux mutants",
    //     "videos": {
    //       "results": [
    //         {
    //           "id": "5f40f032c175b200376847c2",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "Phioh8YnTzk",
    //           "name": "Les Nouveaux Mutants - Spot ComicCon [VOST]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Teaser"
    //         },
    //         {
    //           "id": "5f460220fdc4fa0036bc33cb",
    //           "iso_639_1": "fr",
    //           "iso_3166_1": "FR",
    //           "key": "DNO2iYUsjcc",
    //           "name": "Les Nouveaux Mutants - Extrait [VF]",
    //           "site": "YouTube",
    //           "size": 1080,
    //           "type": "Clip"
    //         }
    //       ]
    //     },
    //     "vote_average": 6.3
    //   };
    //   return of(movie)
    // }

    
  }
  
};

const locationStub = {
  back: "back called",
}