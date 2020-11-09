interface genre {
  id: number,
  name: string
}

interface productionCompany {
  id: number,​​​
  logo_path: string,
  name: string,
  origin_country: string
}

interface productionCountry {
  iso_3166_1: string,
  name: string
}

interface language {
  iso_639_1: string,
  name: string
}

export interface movieDetails {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: {
    backdrop_path: string,
    id: number,
    name: string,
    poster_path: string,
  },
  budget: number,
  genres: [genre],​
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,​
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: [productionCompany],​
  production_countries: [productionCountry],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: [language],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  error?: object
}