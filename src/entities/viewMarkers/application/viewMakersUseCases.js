import { ViewMakersValues } from "../domain/viewMakers.value";

export class ViewMakersUseCase {
  constructor(viewMakersRepository) {
    this.viewMakersRepository = viewMakersRepository;
  }

  create = async ({ user_id, movie_id }) => {
    const viewMakersValue = new ViewMakersValues({
      user_id,
      movie_id,
    });
    const viewMakersCreate =
      this.viewMakersRepository.createViewMakers(viewMakersValue);
    return viewMakersCreate;
  };

  getUsersWithViewedMovies = async () => {
    const getUsers = this.viewMakersRepository.getUsersWithViewedMovies();
    return getUsers;
  };
}
