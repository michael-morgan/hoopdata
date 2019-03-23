const User = require('../models').User;
const bcrypt = require('bcryptjs');

module.exports = {
  list(req, res) {
    return User
      .findAll({
        order: [
          ['firstName', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'User not found.',
          });
        }

        user.dataValues.id = undefined;
        user.dataValues.email = undefined;
        user.dataValues.password = undefined;

        return res.status(200).send(user);
      })
      .catch((error) => {
          res.status(400).send(error)
        });
  },

  add(req, res) {
    return User
      .create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      .then((user) => res.status(201).send({ success: true, message: 'User registered successfully.' }))
      .catch((error) => res.status(400).send({
          success: false,
          message: 'Error: ' + error
      }));
  },

  update(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'User not found',
          });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
