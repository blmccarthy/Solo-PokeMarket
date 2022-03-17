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
  console.log('in POST listing');
  const listing = req.body;
  const queryText = `
    INSERT INTO listing (user_id, card_name, set, condition, graded, grading_service, asking_price, notes, offer_eligible, trade_eligible)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 );
  `
  pool.query(queryText, [req.user.id, listing.card_name, listing.set, listing.condition, listing.graded, listing.grading_service, listing.asking_price, listing.notes, listing.offer_eligible, listing.trade_eligible])
  .then(response => {
    console.log('in POST listing .then');
    res.sendStatus(200);
  }).catch(err => {
    console.log('in POST listing .catch', err);
    res.sendStatus(500);
  })
});

module.exports = router;
