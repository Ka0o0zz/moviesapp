import moment from "moment";
import { pool } from "../../../../db/sql.js";

export class SqlMoviesRepository {
  async createMovie(movieIn) {
    const { name, description, category, release_date } = movieIn;

    if (!moment(release_date, "YYYY/MM/DD", true).isValid()) {
      return {
        ok: false,
        msg: "Invalid release date, the correct format is (year/month/day).",
      };
    }

    await pool.query(
      "INSERT INTO movie (name, description, category, release_date) VALUES (?, ?, ?, ?)",
      [name, description, category, release_date]
    );

    return {
      ok: true,
    };
  }

  async getMovie({ title, category, sort, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;

    const orderBy = sort === "desc" ? "DESC" : "ASC";

    console.log({ title, category, sort, page, limit, offset, orderBy });
    const query =
      `SELECT * FROM movie` +
      (title || category
        ? ` WHERE ` +
          (title ? `name LIKE '%${title}%'` : "") +
          (title && category ? ` AND ` : "") +
          (category ? `category LIKE '%${category}%'` : "")
        : "") +
      ` ORDER BY release_date ${orderBy}` +
      ` LIMIT ${limit}` +
      ` OFFSET ${offset}`;

    const [result] = await pool.query(query);

    return {
      ok: true,
      data: { result },
    };
  }

  async latestReleases() {
    const [result] = await pool.query(
      "SELECT * FROM movie ORDER BY release_date DESC LIMIT 10"
    );
    return {
      ok: true,
      data: { result },
    };
  }
}
