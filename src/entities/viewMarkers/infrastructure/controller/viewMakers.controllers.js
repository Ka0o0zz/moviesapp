export class ViewMakersController {
  constructor(viewMakersUseCase) {
    this.viewMakersUseCase = viewMakersUseCase;
  }

  createViewMakersCtrl = async ({ body }, res) => {
    try {
      const response = await this.viewMakersUseCase.create(body);
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(201).json({
        ...response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Invalid data",
      });
    }
  };

  getUsersWithViewedMoviesCtrl = async ({ query }, res) => {
    try {
      const response = await this.viewMakersUseCase.getUsersWithViewedMovies();
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }
      res.status(201).json({
        ...response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Invalid data",
      });
    }
  };
}
