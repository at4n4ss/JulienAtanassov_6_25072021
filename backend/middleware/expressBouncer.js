var bouncer = require('express-bouncer')(500, 900000);

// Bouncer config
bouncer.blocked = function (req, res, next, remaining) {
  res.send(
    429,
    'Too many requests have been made, ' +
      'please wait ' +
      remaining / 1000 +
      ' seconds'
  );
};

module.exports = bouncer;
