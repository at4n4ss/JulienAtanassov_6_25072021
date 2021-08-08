// Tokens d'authentification
const jwt = require('jsonwebtoken');
// Accès au model User
const User = require('../models/User');
// Import bouncer
const bouncer = require('../middleware/expressBouncer');
// Cryptage du password
const bcrypt = require('bcrypt');
// Password validator
var passwordValidator = require('password-validator');
// schema
var schemaPassword = new passwordValidator();
schemaPassword // Password validation rules
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

// Export des fonctions reliées aux users
exports.signup = (req, res, next) => {
  if (schemaPassword.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user
          .save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    res.status(401).json({
      error: 'Le mot de passe ne valide pas les critères de sécurité'
    });
  }
};
exports.login = (req, res, next) => {
  if (schemaPassword.validate(req.body.password)) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: 'Mot de passe incorrect !' });
            }
            // Login succeeded we reset the bouncer
            bouncer.reset(req);
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h'
              })
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    res.status(401).json({
      error: 'Le mot de passe ne valide pas les critères de sécurité'
    });
  }
};
