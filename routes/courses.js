var express = require('express');
var router = express.Router();
const coursesdb = require('../data/coursedb');

router.get('/', async (req, res, next) => {
  try {
    const items = await coursesdb.queryCourses();
    res.send(items);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { itemCount } = await coursesdb.createCourses();
    res.send(`Number of courses added: ${itemCount}`);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
