const express = require('express');
const router = express.Router();

// check Token
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// like/dislike
router.post('/:id/like', auth, sauceCtrl.rateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;
