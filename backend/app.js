const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const path = require('path');
/* Importation framework mongoose */
const mongoose = require('mongoose');
/* router stuff */
const stuffRoutes = require('./routes/sauces');
app.use('/api/stuff', stuffRoutes);
/* router authentification */
const userRoutes = require('./routes/user');
// Routes sauces
const saucesRoutes = require('./routes/sauces');
/* Connection avec la base de donnée mongoose */
mongoose
  .connect(
    'mongodb+srv://at4:29041995stak4n0v@cluster0.ctk3o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
/* ----- */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*', 'cross-origin');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
// Requetes concernant les sauces
app.use('/api/sauces', saucesRoutes);
/* Requetes authentification */
app.use('/api/auth', userRoutes);

module.exports = app;
