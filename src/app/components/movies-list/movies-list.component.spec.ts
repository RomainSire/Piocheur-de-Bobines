import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { TMDBService } from 'src/app/services/tmdb.service';
import { MoviesListComponent } from './movies-list.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('MoviesListComponent', () => {
  describe('General at startup', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { params: of({page: 2}) } }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call initSearchForm at startup', () => {
      spyOn<any>(component, 'initSearchMovieForm');
      component.ngOnInit();
      const method = 'initSearchMovieForm';
      expect(component[method]).toHaveBeenCalledTimes(1);
    });
    it('should get the page from the url param at startup', () => {
      component.ngOnInit();
      expect(component.page).toBe(2);
    });
  });

  describe('List of movies by genre', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { params: of({page: 2, genre: 'Action'}) } }
        ]
      })
      .compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should get the genre from the url param at startup', () => {
      component.ngOnInit();
      expect(component.pageTitle).toBe('Action');
    });
    it('should call the getMovieList method once', () => {
      spyOn<any>(component, 'getMovieList');
      component.ngOnInit();
      const method = 'getMovieList';
      expect(component[method]).toHaveBeenCalledTimes(1);
    });
  });

  describe('List of movies by genre, but with a bad genre', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    let router: Router;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { params: of({page: 2, genre: 'test'}) } }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should navigate to home page', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.ngOnInit();
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  });

  describe('List of searched movies', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { params: of({page: 2, term: 'totoro'}) } }
        ]
      })
      .compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should get the genre from the url param at startup', () => {
      component.ngOnInit();
      expect(component.pageTitle).toBe('Recherche : totoro');
    });
    it('should call the getMovieList method once', () => {
      spyOn<any>(component, 'getMovieList');
      component.ngOnInit();
      const method = 'getMovieList';
      expect(component[method]).toHaveBeenCalledTimes(1);
    });
  });

  describe('List of tendance movies', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { params: of({page: 2}) } }
        ]
      })
      .compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should get the genre from the url param at startup', () => {
      component.ngOnInit();
      expect(component.pageTitle).toBe('Tendances');
    });
    it('should call the getMovieList method once', () => {
      spyOn<any>(component, 'getMovieList');
      component.ngOnInit();
      const method = 'getMovieList';
      expect(component[method]).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMovieList Method', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    let router: Router;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          {provide: TMDBService, useValue: tbdbServiceStub}
        ]
      })
      .compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should get the movie list when the getMovieList method is called', () => {
      const method = 'getMovieList';
      component[method]('test');
      expect(component.movies[0].id).toBe(340102);
    });

    it('should go to 404 page if there is an error while calling getMoviesList method', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const method = 'getMovieList';
      component[method]('error');
      expect(navigateSpy).toHaveBeenCalledWith(['/404']);
    });
  });

  describe('onSearchSubmit Method', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    let router: Router;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ MoviesListComponent ],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule
        ],
        providers: [
          FormBuilder
        ]
      })
      .compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(MoviesListComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should go to the result page when a term is searched', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const method = 'searchTerm';
      component.searchMovieForm.controls[method].setValue('test');
      component.onSearchSubmit();
      expect(navigateSpy).toHaveBeenCalledWith(['/search/test/1']);
    });
  });
});

const tbdbServiceStub = {
  getMoviesList(url: string): any {
    // si on envoie l'url 'error, ça va envoyer une erreur...
    if (url === 'error') {
      return of({error: 'Une erreur s\'est produite'});
    }


    const response = {
      page: 1,
      results: [
        {
          id: 340102,
          video: false,
          vote_count: 785,
          vote_average: 6.3,
          title: 'The New Mutants',
          release_date: '2020-08-26',
          original_language: 'en',
          original_title: 'The New Mutants',
          genre_ids: [
            28,
            878,
            27,
            12
          ],
          backdrop_path: '/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg',
          adult: false,
          overview: 'Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.',
          poster_path: '/xZNw9xxtwbEf25NYoz52KdbXHPM.jpg',
          popularity: 800.839,
          media_type: 'movie'
        },
        {
          id: 524047,
          video: false,
          vote_count: 576,
          vote_average: 7.1,
          title: 'Greenland',
          release_date: '2020-07-29',
          original_language: 'en',
          original_title: 'Greenland',
          genre_ids: [
            28,
            53
          ],
          backdrop_path: '/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg',
          adult: false,
          overview: 'John Garrity, his estranged wife and their young son embark on a perilous journey to find sanctuary as a planet-killing comet hurtles toward Earth. Amid terrifying accounts of cities getting levelled, the Garrity\'s experience the best and worst in humanity. As the countdown to the global apocalypse approaches zero, their incredible trek culminates in a desperate and last-minute flight to a possible safe haven.',
          poster_path: '/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg',
          popularity: 1283.929,
          media_type: 'movie'
        },
        {
          id: 400160,
          video: false,
          vote_count: 1483,
          vote_average: 8.1,
          title: 'The SpongeBob Movie: Sponge on the Run',
          release_date: '2020-08-14',
          original_language: 'en',
          original_title: 'The SpongeBob Movie: Sponge on the Run',
          genre_ids: [
            16,
            14,
            12,
            35,
            10751
          ],
          backdrop_path: '/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
          adult: false,
          overview: 'When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.',
          poster_path: '/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg',
          popularity: 1401.739,
          media_type: 'movie'
        }
      ],
      total_pages: 1000,
      total_results: 20000
    };
    return of(response);
  }

};
