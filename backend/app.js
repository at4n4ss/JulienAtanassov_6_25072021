const express = require('express');

const app = express();
/* Importation framework mongoose */
const mongoose = require('mongoose');
/* router stuff */
const stuffRoutes = require('./routes/stuff');
app.use('/api/stuff', stuffRoutes);
/* router authentification */
const userRoutes = require('./routes/user');
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

/* test requete   */
app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
});
/* Requetes authentification */
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
