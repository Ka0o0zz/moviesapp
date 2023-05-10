export class MoviesValue {
  constructor({ name, description, category, release_date }) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.release_date = release_date;
  }
}

export class MoviesFilters {
  constructor({ title, category, sort, page, limit }) {
    this.title = title;
    this.category = category;
    this.sort = sort;
    this.page = page;
    this.limit = limit;
  }
}
