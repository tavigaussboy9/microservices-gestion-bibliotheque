const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Modèle de livre
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedDate: Date
}));

// Routes
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).send(book);
});

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
