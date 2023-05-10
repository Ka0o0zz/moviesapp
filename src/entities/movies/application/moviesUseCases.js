import { MoviesFilters, MoviesValue } from "../domain/movies.value.js";

export class MoviesUseCase {
  constructor(moviesRepository) {
    this.moviesRepository = moviesRepository;
  }

  create = async ({ name, description, category, release_date }) => {
    const movieValue = new MoviesValue({
      name,
      description,
      category,
      release_date,
    });
    const movieCreate = this.moviesRepository.createMovie(movieValue);
    return movieCreate;
  };

  getMovie = async ({ title, category, sort, page, limit }) => {
    const movieFilters = new MoviesFilters({
      title,
      category,
      sort,
      page,
      limit,
    });
    const getMovies = this.moviesRepository.getMovie(movieFilters);
    return getMovies;
  };

  latestReleases = async () => {
    const getMovies = this.moviesRepository.latestReleases();
    return getMovies;
  };
}
