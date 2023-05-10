import { Router } from "express";
import { MoviesUseCase } from "../../application/moviesUseCases.js";
import { SqlMoviesRepository } from "../repository/sql.movies.repository.js";
import { MoviesController } from "../controller/movies.controllers.js";

const router = Router();

const sqlMoviesRepository = new SqlMoviesRepository();
const moviesUseCase = new MoviesUseCase(sqlMoviesRepository);
const moviesCtrl = new MoviesController(moviesUseCase);

router.post("/", moviesCtrl.createMovieCtrl);

router.get("/", moviesCtrl.getMovieCtrl);
router.get("/latest-releases", moviesCtrl.latestReleasesCtrl);

export default router;
