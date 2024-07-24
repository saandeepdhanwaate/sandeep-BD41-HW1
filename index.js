const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1 Template" });
});

// YOUR ENDPOINTS GO HERE

// books
async function fetchAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  let result = await fetchAllBooks();
  res.status(200).json(result);
});

// books/author/:author
async function fetchBooksByAuthor(author) {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  let author = req.params.author;
  let result = await fetchBooksByAuthor(author);
  res.status(200).json(result);
});

// books/genre/:genre
async function fetchBooksByGenre(genre) {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { books: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchBooksByGenre(genre);
  res.status(200).json(result);
});

// books/publication_year/:year
async function fetchBooksByPublicationYear(publication_year) {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [publication_year]);
  return { books: response };
}
app.get("/books/publication_year/:year", async (req, res) => {
  let year = req.params.year;
  let result = await fetchBooksByPublicationYear(year);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
