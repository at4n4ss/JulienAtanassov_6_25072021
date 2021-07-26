const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('', auth, multer, saucesCtrl.createSauce);

router.delete('/:id ', auth, multer, saucesCtrl.deleteSauce);

module.exports = router;
