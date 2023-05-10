import moment from "moment";
import { pool } from "../../../../db/sql";

export class SqlViewMakersRepository {
  async createViewMakers(viewMakerIn) {
    const { user_id, movie_id } = viewMakerIn;
    const viewed_at = moment().format("YYYY-MM-DD");

    const [result] = await pool.query(
      "INSERT INTO view_markers (user_id, movie_id, viewed_at) VALUES (?, ?, ?)",
      [user_id, movie_id, viewed_at]
    );

    if (result.affectedRows <= 0) {
      return {
        ok: false,
        msg: "The movie could not be marked as viewed by the user.",
      };
    }
    return {
      ok: true,
    };
  }

  async getUsersWithViewedMovies() {
    const query = `
    SELECT u.id, u.email, u.name, u.lastname, u.phone,
           JSON_ARRAYAGG(JSON_OBJECT('viewed_at', vm.viewed_at, 'movie_name', m.name)) AS movies_viewed
    FROM users u
    JOIN view_markers vm ON u.id = vm.user_id
    JOIN movie m ON vm.movie_id = m.id
    GROUP BY u.id`;

    const [result] = await pool.query(query);

    return {
      ok: true,
      data: { result },
    };
  }
}
