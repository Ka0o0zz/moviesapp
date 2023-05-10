import { pool } from "../../../../db/sql.js";
import { encrypt, verifiedPassword } from "../../../../utils/bcrypt.handle.js";
import { generateToken } from "../../../../utils/jwt.js";

export class SqlAuthRepository {
  async register(userIn) {
    const { email, name, lastname, phone, password } = userIn;

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    if (existingUser.length > 0) {
      return {
        ok: false,
        msg: "This email or phone is already registered, do you want to recover the password?",
      };
    }
    const passwordHash = await encrypt(password);
    const [result] = await pool.query(
      "INSERT INTO users (email, name, lastname, password, phone) VALUES (?, ?, ?, ?, ?)",
      [email, name, lastname, passwordHash, phone]
    );

    return {
      ok: true,
      data: {
        id: result.insertId,
        userIn,
      },
    };
  }

  async login({ email, password }) {
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length === 0) {
      return {
        ok: false,
        msg: "This email is not registered.",
      };
    }

    const isPasswordCorrect = verifiedPassword(
      `${password}`,
      existingUser[0].password
    );

    if (!isPasswordCorrect) {
      return {
        ok: false,
        msg: "Incorrect password.",
      };
    }
    const token = await generateToken(existingUser[0].id);
    return {
      ok: true,
      data: {
        token,
        id: existingUser[0].id,
        email: existingUser[0].email,
        name: existingUser[0].name,
        lastname: existingUser[0].lastname,
        phone: existingUser[0].phone,
      },
    };
  }
}
