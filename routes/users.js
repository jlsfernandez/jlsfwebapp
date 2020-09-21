var express = require('express');
var router = express.Router();
const userdb = require('../data/userdb');

/* GET users listing. */
router.get('/', async (req, res, next) =>  {
  try{
    const { rows } = await userdb.queryUsers();
   // console.log('execute query');
   // console.log(rows);
    res.send( rows);
  } catch(err){
    res.status(500).send(err.message);
  }
 // res.send('respond with a resource');
});

/* insert users */
router.put('/', async (req, res, next) =>  {
  try{
    const { rowCount } = await userdb.createUsers();
    res.send(`Number of users create: ${rowCount}`);
  } catch(err){
    res.status(500).send(err.message);
  }
 // res.send('respond with a resource');
});


module.exports = router;
