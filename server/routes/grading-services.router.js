const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// GET CONDITIONS 
router.get('/', (req, res) => {
  console.log('in GET grading-services router');
  queryText = `SELECT * FROM grading_services_library;`
  pool.query(queryText).then(response => {
    console.log('in GRADING_SERVICES.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in GRADING_SERVICES.get.catch');
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
