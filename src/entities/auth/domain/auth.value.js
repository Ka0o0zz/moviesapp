import { v4 as uuid } from "uuid";

export class AuthValue {
  constructor({ name, lastname, email, phone, password }) {
    this.uuid = uuid();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
