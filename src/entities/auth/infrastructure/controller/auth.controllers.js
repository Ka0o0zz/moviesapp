export class AuthController {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  registerCtrl = async ({ body }, res) => {
    try {
      const response = await this.authUseCase.register(body);
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

  loginCtrl = async ({ body }, res) => {
    try {
      const response = await this.authUseCase.login(body);
      if (!response.ok) {
        res.status(500).json({
          ...response,
        });
        return;
      }

      res.status(200).json({
        ...response,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Invalid data",
      });
    }
  };
}
