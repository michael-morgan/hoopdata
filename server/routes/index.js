const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;
const authController = require('../controllers').authentication;
const spotController = require('../controllers').spot;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/auth/login', authController.login);
router.post('/api/auth/register', [authController.checkDuplicate], userController.add);

router.get('/api/user/:id', [authController.verifyToken], userController.getById);
//router.get('/api/user', userController.list);
//router.post('/api/user', [authController.checkDuplicate], userController.add);
//router.put('/api/user/:id', userController.update);
//router.delete('/api/user/:id', userController.delete);

router.get('/api/user/spot/:id', [authController.verifyToken], spotController.getByUser);
router.post('/api/user/spot', [authController.verifyToken], spotController.add);

module.exports = router;
