const Spot = require('../models').Spot;

module.exports = {
  getByUser(req, res) {
    return Spot
      .findAll({
        where: {
          userId: req.params.id
        }
      })
      .then((spots) => {
        if (!spots) {
          return res.status(404).send({
            success: false,
            message: 'Spots not found.',
          });
        }

        return res.status(200).send(spots);
      })
      .catch((error) => {
          res.status(400).send(error)
        });
  },

  add(req, res) {
    return Spot
      .create({
        spot: req.body.spot,
        userId: req.body.userId,
        makes: req.body.makes,
        attempts: req.body.attempts
      })
      .then((spot) => res.status(201).send({ spot, success: true, message: 'Spot added successfully.' }))
      .catch((error) => res.status(400).send({
          success: false,
          message: 'Error: ' + error
      }));
  }
};
