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
    // si on envoie l'id 404, ça va envoyer une erreur...
    if (id === 404) {
      return of({error: 'Une erreur s\'est produite'})
    }

    const movie = {
      "backdrop_path": "/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg",
      "id": id,
      "poster_path": "/aYHaR3FhKjipcy499YjCPRv4vcz.jpg",
      "release_date": "2020-08-26",
      "runtime": 98,
      "title": "Les Nouveaux mutants",
      "vote_average": 6.3
    };
    return of(movie)
  }
  
};

const locationStub = {
  back: "back called",
}