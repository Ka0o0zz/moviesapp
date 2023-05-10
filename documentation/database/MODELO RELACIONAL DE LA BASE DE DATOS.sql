         +-----------------+         +-------------------+         +-----------------+
         |      movie      |         |       users       |         |    view_maker   |
         +-----------------+         +-------------------+         +-----------------+
         |       id        |         |         id        |         |        id       |
         |      name       |         |       email       |         |     user_id     |
         |   description   |         |        name       |         |     movie_id    |
         |     category    |         |     password      |         |    viewed_at    |
         |  release_date   |         |      lastname     |         +-----------------+
         +-----------------+         |       phone       |
                                     +-------------------+

CREATE TABLE movie (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  release_date DATE
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE view_makers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  movie_id INT UNSIGNED NOT NULL,
  viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (movie_id) REFERENCES movie (id)
);
