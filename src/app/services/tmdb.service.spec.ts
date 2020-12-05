import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TMDBService } from './tmdb.service';
import { TMDBMovieList } from '../interfaces/tmdbMovieList.interface';
import { MovieDetails } from '../interfaces/movieDetails.interface';

import { environment } from '../../environments/environment';

describe('TMDBService', () => {
  let httpTestingController: HttpTestingController;
  let tmdbService: TMDBService;
  let tmdbMovieList: TMDBMovieList;
  let movieDetails: MovieDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    tmdbMovieList = {
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
    movieDetails = {
      adult: false,
      backdrop_path: '/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg',
      belongs_to_collection: null,
      budget: 63000000,
      genres: [
        {
          id: 18,
          name: 'Drame'
        }
      ],
      homepage: 'http://www.foxmovies.com/movies/fight-club',
      id: 550,
      imdb_id: 'tt0137523',
      original_language: 'en',
      original_title: 'Fight Club',
      overview: 'Le narrateur, sans identité précise, vit seul, travaille seul, dort seul, mange seul ses plateaux-repas pour une personne comme beaucoup d’autres personnes seules qui connaissent la misère humaine, morale et sexuelle. C’est pourquoi il va devenir membre du Fight club, un lieu clandestin où il va pouvoir retrouver sa virilité, l’échange et la communication. Ce club est dirigé par Tyler Durden, une sorte d’anarchiste entre gourou et philosophe qui prêche l’amour de son prochain.',
      popularity: 39.775,
      poster_path: '/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
      production_companies: [
        {
          id: 508,
          logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
          name: 'Regency Enterprises',
          origin_country: 'US'
        },
        {
          id: 711,
          logo_path: '/tEiIH5QesdheJmDAqQwvtN60727.png',
          name: 'Fox 2000 Pictures',
          origin_country: 'US'
        },
        {
          id: 20555,
          logo_path: '/hD8yEGUBlHOcfHYbujp71vD8gZp.png',
          name: 'Taurus Film',
          origin_country: 'DE'
        },
        {
          id: 54051,
          logo_path: null,
          name: 'Atman Entertainment',
          origin_country: ''
        },
        {
          id: 54052,
          logo_path: null,
          name: 'Knickerbocker Films',
          origin_country: 'US'
        },
        {
          id: 25,
          logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
          name: '20th Century Fox',
          origin_country: 'US'
        },
        {
          id: 4700,
          logo_path: '/A32wmjrs9Psf4zw0uaixF0GXfxq.png',
          name: 'The Linson Company',
          origin_country: ''
        }
      ],
      production_countries: [
        {
          iso_3166_1: 'DE',
          name: 'Germany'
        },
        {
          iso_3166_1: 'US',
          name: 'United States of America'
        }
      ],
      release_date: '1999-10-15',
      revenue: 100853753,
      runtime: 139,
      spoken_languages: [
        {
          english_name: 'English',
          iso_639_1: 'en',
          name: 'English'
        }
      ],
      status: 'Released',
      tagline: 'Chaos. Confusion. Savon.',
      title: 'Fight Club',
      video: false,
      videos: {
        results: [
          {
            id: 'string',
            iso_3166_1: 'string',
            iso_639_1: 'string',
            key: 'string',
            name: 'string',
            site: 'string',
            size: 12,
            type: 'string',
          }
        ]
      },
      vote_average: 8.4,
      vote_count: 20460
    };
  });

  beforeEach(inject(
    [TMDBService],
    (service: TMDBService) => {
      tmdbService = service;
    }
  ));

  it('Method getMoviesList should return data', () => {
    let result: TMDBMovieList;
    tmdbService.getMoviesList('url').subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: 'url'
    });

    req.flush([tmdbMovieList]);

    expect(result[0]).toEqual(tmdbMovieList);
  });

  it('Method getMovieDetail should return data', () => {
    let result: MovieDetails;
    const movieId = 1;
    tmdbService.getMovieDetail(movieId).subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.databaseUrl}/movie/${movieId}?api_key=${environment.APIKey}&language=fr&append_to_response=videos`
    });

    req.flush([movieDetails]);

    expect(result[0]).toEqual(movieDetails);
  });

  it('method getMoviesList should throw error', () => {
    let error: any;
    tmdbService.getMoviesList('url').subscribe(e => {
      error = e;
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: 'url'
    });
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network error'
    });
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Network error');
  });

  it('method getMovieDetail should throw error', () => {
    let error: any;
    tmdbService.getMovieDetail(1).subscribe(e => {
      error = e;
    });

    const req = httpTestingController.expectOne({
      method: 'GET'
    });
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network error'
    });
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Network error');
  });

});
