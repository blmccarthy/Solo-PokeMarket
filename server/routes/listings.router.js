const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

router.get('/', (req, res) => {
  console.log('in GET listings router');
  queryText = `SELECT * FROM listing;`
  pool.query(queryText).then(response => {
    console.log('in listings.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in listings.get.catch');
    res.sendStatus(500);
  })
});

// ================================================================================================ //
//     POST
// ================================================================================================ //

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
