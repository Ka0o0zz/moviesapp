import { AuthValue } from "../domain/auth.value";

export class AuthUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  register = async ({ name, lastname, email, phone, password }) => {
    const userValue = new AuthValue({ name, lastname, email, phone, password });
    const userCreate = this.authRepository.register(userValue);
    return userCreate;
  };

  login = async ({ email, password }) => {
    const user = new AuthValue({ email, password });
    const userLogin = this.authRepository.login(user);
    return userLogin;
  };
}
