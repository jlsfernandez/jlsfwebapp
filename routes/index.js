var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'Azure App Service Jlsf',
    message: process.env.MESSAGE || 'THis is development'
  };
  //res.render('index', { title: 'AZure App Service with node.js' });
  res.render('index',data);
});

module.exports = router;
