const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;
const authController = require('../controllers').authentication;

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

module.exports = router;
