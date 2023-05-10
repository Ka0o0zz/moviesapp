export class MoviesController {
  constructor(moviesUseCase) {
    this.moviesUseCase = moviesUseCase;
  }
  createMovieCtrl = async ({ body }, res) => {
    try {
      const response = await this.moviesUseCase.create(body);
      if (!response.ok) {
        res.status(400).json({
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

  getMovieCtrl = async ({ query }, res) => {
    try {
      const response = await this.moviesUseCase.getMovie(query);
      if (!response.ok) {
        res.status(400).json({
          ...response,
        });
        return;
      }
      res.status(200).json({
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

  latestReleasesCtrl = async ({ query }, res) => {
    try {
      const response = await this.moviesUseCase.latestReleases();
      if (!response.ok) {
        res.status(400).json({
          ...response,
        });
        return;
      }
      res.status(200).json({
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
