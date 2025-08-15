const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Modèle de prêt
const Loan = mongoose.model('Loan', new mongoose.Schema({
  bookId: String,
  userId: String,
  loanDate: Date,
  returnDate: Date
}));

// Routes
app.post('/loans', async (req, res) => {
  const loan = new Loan(req.body);
  await loan.save();
  res.status(201).send(loan);
});

app.get('/loans', async (req, res) => {
  const loans = await Loan.find();
  res.send(loans);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
