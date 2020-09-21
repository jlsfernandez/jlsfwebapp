var express = require('express');
var router = express.Router();

const imagedb = require('../data/imagedb');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');
const getStream = require('into-stream');

router.get('/', function(req, res, next) {
  res.render('images');
});

router.post('/', uploadStrategy, async (req, res, next) => {
  try {
    const stream = getStream(req.file.buffer);
    const { id } = await imagedb.uploadImage(stream);
    res.redirect(`/images/show/${id}`);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

router.get('/show/:imageId', async (req, res, next) => {
  try {
    var url = await imagedb.getImageUri(req.params.imageId);
    res.render('showimage', { imageSrc: url });
  } catch(err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
