import { Router } from "express";
import { AuthUseCase } from "../../application/authUseCases.js";
import { AuthController } from "../controller/auth.controllers.js";
import { SqlAuthRepository } from "../repository/sql.auth.repository.js";

const router = Router();

const sqlAuthRepository = new SqlAuthRepository();
const authUseCase = new AuthUseCase(sqlAuthRepository);
const authCtrl = new AuthController(authUseCase);

router.post("/", authCtrl.registerCtrl);
router.post("/login", authCtrl.loginCtrl);

export default router;
