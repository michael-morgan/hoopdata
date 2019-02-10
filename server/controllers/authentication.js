const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    secret: "HoopDataSecret",

    checkDuplicate(req, res, next) {
        return User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            if (user) {
                res.status(400).send("Email is already taken.");
                return;
            }

            next();
        }).catch((error) => res.status(400).send(error));
    },

    verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({
                auth: false, message: 'No token provided.'
            });
        }

        jwt.verify(token, this.secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'Authentication failed. Error: ' + err
                });
            }

            req.userId = decoded.id;
            next();
        });
    },

    login(req, res) {
        return User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            if (!user) {
                return res.status(404).send({ success: false, message: 'User not found.' });
            }

            const passwordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordValid) {
                return res.status(401).send({ auth: false, accessToken: null, success: false, message: 'Invalid password.' });
            }

            const token = jwt.sign({ id: user.id }, this.secret, { expiresIn: 86400 });

            res.status(200).send({ auth: true, accessToken: token, success: true, message: 'Login successful.' });
        }).catch(err => {
            res.status(500).send({ success: false, message: 'Error: ' + err });
        });
    }
};
