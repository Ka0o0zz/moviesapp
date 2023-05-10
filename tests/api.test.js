import { app } from "../src/index.js";
import request from "supertest";
import { expect } from "chai";

/**
 * testing de los edpoins de la API
 */

it("you should answer an array of users with the movies they have seen.", (done) => {
  request(app)
    .get("/api/view-makers")
    .expect(200)
    .timeout(2000)
    .end(function (err, res) {
      if (err) {
        throw new Error(err);
      }
      const response = res.body;

      expect(response.ok).to.be.true;
      expect(response.data.result).to.be.an("array");

      response.data.result.forEach((user) => {
        expect(user).to.have.property("id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("name");
        expect(user).to.have.property("lastname");
        expect(user).to.have.property("phone");

        if (user.movies_viewed.length > 0) {
          expect(user.movies_viewed).to.be.an("array");
          user.movies_viewed.forEach((movie) => {
            expect(movie).to.have.property("viewed_at");
            expect(movie).to.have.property("movie_name");
          });
        }
      });

      done();
    });
});

it("you should create a view_maker to indicate if a user watched a movie.", (done) => {
  request(app)
    .post("/api/view-makers")
    .send({ user_id: "2", movie_id: "11" })
    .expect(201)
    .timeout(2000)
    .end(function (err, res) {
      if (err) {
        throw new Error(err);
      }
      const response = res.body;

      expect(response.ok).to.be.true;

      done();
    });
});

it("should bring an array with the last 10 movies that have been published.", (done) => {
  request(app)
    .get("/api/movies/latest-releases")
    .expect(200)
    .timeout(2000)
    .end(function (err, res) {
      if (err) {
        throw new Error(err);
      }
      const response = res.body;

      expect(response.ok).to.be.true;
      expect(response.data.result).to.be.an("array");

      response.data.result.forEach((movie) => {
        expect(movie).to.have.property("id");
        expect(movie).to.have.property("name");
        expect(movie).to.have.property("description");
        expect(movie).to.have.property("category");
        expect(movie).to.have.property("release_date");
      });

      done();
    });
});

describe("Endpoint /api/movies", () => {
  it("should return an array of filtered and sorted movies.", async () => {
    const response = await request(app)
      .get("/api/movies")
      .query({
        title: "El gran hotel Budapest",
        category: "Drama",
        sort: "desc",
        page: 1,
        limit: 10,
      })
      .expect(200);

    const { ok, data } = response.body;

    expect(ok).to.be.true;
    expect(data).to.have.property("result").that.is.an("array");

    const movies = data.result;
    if (movies.length > 0) {
      for (const movie of movies) {
        expect(movie).to.have.property("id").that.is.a("number");
        expect(movie).to.have.property("name").that.is.a("string");
        expect(movie).to.have.property("category").that.is.a("string");
        expect(movie).to.have.property("description").that.is.a("string");
        expect(movie).to.have.property("release_date").that.is.a("string");
      }
    }
  });
});

it("should create a movie", (done) => {
  request(app)
    .post("/api/movies")
    .send({
      name: "pelicula de prueba 2",
      description: "pelicula de prueba 2",
      category: "Drama",
      release_date: "2023/09/26",
    })
    .expect(201)
    .timeout(2000)
    .end(function (err, res) {
      if (err) {
        throw new Error(err);
      }
      const response = res.body;

      expect(response.ok).to.be.true;

      done();
    });
});

it("you should return the accesses to the account", (done) => {
  request(app)
    .post("/api/auth/login")
    .send({
      email: "saramorales15V@gmail.com",
      password: "hola1234%",
    })
    .expect(200)
    .timeout(2000)
    .end(function (err, res) {
      if (err) {
        throw new Error(err);
      }
      const response = res.body;
      expect(response.ok).to.be.true;
      const user = res.body.data;
      if (response.ok) {
        expect(user).to.have.property("token").that.is.an("string");
        expect(user).to.have.property("id").that.is.an("number");
        expect(user).to.have.property("email").that.is.an("string");
        expect(user).to.have.property("name").that.is.an("string");
        expect(user).to.have.property("lastname").that.is.an("string");
        expect(user).to.have.property("phone").that.is.an("string");
      }

      done();
    });
});
