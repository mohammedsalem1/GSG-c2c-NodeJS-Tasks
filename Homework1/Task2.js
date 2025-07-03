                             //  Task-2
// Base class
class LibraryItem {
  #title;
  #year;

  constructor(title, year) {
    this.#title = title;
    this.#year = year;
  }
  get title() {
    return this.#title;
  }

  get year() {
    return this.#year;
  }
  describe() {
    return `${this.#title} was published in ${this.#year}`;
  }

  static isLibraryItem(obj) {
    return obj instanceof LibraryItem;
  }
}

// Subclass
class Book extends LibraryItem {
  #author;

  constructor(title, year, author) {
    super(title, year);
    this.#author = author;
  }

  describe() {
    return `📘 "${this.title}" by ${this.#author}, published in ${this.year}`;
  }
}
