const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// RETURN SEARCH RESULTS 
router.get('/:search', (req, res) => {
  const searchFromUser = req.params.search;
  const queryText = `SELECT * FROM listing WHERE card_name ILIKE ('%' || $1 || '%');`;
  pool.query(queryText, [searchFromUser]).then(response => {
    console.log('in SEARCH.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in SEARCH.get.catch', err);
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
