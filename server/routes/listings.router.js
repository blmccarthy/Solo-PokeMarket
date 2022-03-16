const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// GET LISTINGS
router.get('/', (req, res) => {
  console.log('in GET listings router');
  queryText = `SELECT * FROM listing ORDER BY id DESC;`
  pool.query(queryText).then(response => {
    console.log('in listings.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in listings.get.catch');
    res.sendStatus(500);
  })
});

// GET LISTINGS
router.get('/my-listings', (req, res) => {
  const userId = req.user.id
  queryText = `SELECT * FROM listing WHERE user_id = $1 ORDER BY id DESC;`
  pool.query(queryText, [userId]).then(response => {
    console.log('in MY LISTINGS .then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in MY-LISTINGS .catch');
    res.sendStatus(500);
  })
});

// GET IMAGES
router.get('/images', (req, res) => {
  console.log('in GET listings/images router');
  queryText = `SELECT * FROM image;`
  pool.query(queryText).then(response => {
    console.log('in images.get.then');
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
