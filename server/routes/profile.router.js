const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// GET MY LISTINGS COUNT
router.get('/listing-count', (req, res) => {
    const userId = req.user.id;
    console.log('userId', userId);
    const queryText = `SELECT COUNT(id) FROM listing WHERE user_id = $1;`;
    pool.query(queryText, [userId]).then(response => {
      console.log('in MY COUNT .then');
      res.send(response.rows);
    }).catch(err => {
      console.log('in MY COUNT .catch');
      res.sendStatus(500);
    })
  });

// ================================================================================================ //
//     POST
// ================================================================================================ //

// POST OFFER
router.post('/', (req, res) => {
// post here
});

module.exports = router;
