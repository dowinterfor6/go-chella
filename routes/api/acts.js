const express = require('express');
const router = express.Router();
const passport = require('passport');

const Act = require('../../models/Act');

router.get('/test', (req, res) => {
    res.json({ msg: 'Welcome to Astroworld!' })
})

router.get('/', (req, res) => {
    Act.find()
        .sort({ data: -1 })
        .then((acts) => res.json(acts))
        .catch((err) => res.status(400).json({ noactsfound: 'No acts found.' }))
});

router.get('/:id', (req, res) => {
    Act.findById(req.params.id)
        .then((act) => res.json(act))
        .catch((err) => res.status(404).json({ noactsfound: 'No acts found.' }))
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  
    const newAct = new Act({
      name: req.body.name,
      stage: req.body.stage,
      duration: req.body.duration,
      date: req.body.date,
      url: req.body.url
    });
  
    newAct.save().then((act) => res.json(act));
  });

module.exports = router;