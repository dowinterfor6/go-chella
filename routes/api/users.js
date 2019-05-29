const express = require("express");
const router = express.Router();
// Import bcrypt and user model for registration
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
// Import webtoken to access protected routes
const jwt = require('jsonwebtoken');
// Import keys from keys.js
const keys = require('../../config/keys');
// Import passport
const passport = require('passport');
// Import validators
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Register route
router.post('/register', (req, res) => {
  // TODO: Once we get there lol
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // TODO: TEMPORARY
  // let errors = { username: "", password: ""};

  // Find by username instead of email
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        errors.username = "User already exists";
        // Throw status 400 error
        return res.status(400).json(errors)
      } else {
        // Create a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        // Generate hashed password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              // TODO: Update if user model changes (unlikely)
              .then((user) => {
                const payload = { id: user.id, username: user.username };

                jwt.sign(
                  payload, 
                  keys.secretOrKey, 
                  {expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                )
              })
              .catch((err) => console.log(err));
          })
        })
      }
    })
})

// Login route
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then((user) => {
      // If user not found by username
      if (!user) {
        errors.username = "This user does not exist";
        return res.status(404).json(errors);
      }

      // If user found by email
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Setup payload
            const payload = {id: user.id, username: user.username};
            
            jwt.sign(
              payload,
              keys.secretOrKey,
              // Expire key in one hour
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = "Incorrect password";
            return res.status(400).json(errors);
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    groups: req.user.groups
  });
});

router.get('/:user_id/groups', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    groups: req.user.groups
  });
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find()
    .sort({ data: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ nousersfound: 'No users found.' }))
});

module.exports = router;