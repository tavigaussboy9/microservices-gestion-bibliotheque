const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

// Route pour envoyer un email de notification
app.post('/notify', (req, res) => {
  const { email, message } = req.body;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Notification de retard',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
