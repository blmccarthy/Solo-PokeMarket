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
      console.log('in MY COUNT .then'); // Directly grabs the count
      res.send(response.rows[0].count);
    }).catch(err => {
      console.log('in MY COUNT .catch');
      res.sendStatus(500);
    })
  });

// GET MY OUTGOING OFFERS COUNT
router.get('/offers-out-count', (req, res) => {
    const userId = req.user.id;
    console.log('userId', userId);
    const queryText = `SELECT COUNT(id) FROM offer WHERE buyer_user_id = $1 AND status = 'pending';`;
    pool.query(queryText, [userId]).then(response => {
      console.log('in OUT COUNT .then'); 
      res.send(response.rows[0].count); // Directly grabs the count
    }).catch(err => {
      console.log('in OUT COUNT .catch');
      res.sendStatus(500);
    })
  });

// GET MY OUTGOING OFFERS COUNT
router.get('/offers-in-count', (req, res) => {
    const userId = req.user.id;
    console.log('userId', userId);
    const queryText = `SELECT COUNT(id) FROM offer WHERE seller_user_id = $1 AND status = 'pending';`;
    pool.query(queryText, [userId]).then(response => {
      console.log('in IN COUNT .then', response.rows); 
      res.send(response.rows[0].count); // Directly grabs the count
    }).catch(err => {
      console.log('in IN COUNT .catch');
      res.sendStatus(500);
    })
  });

// ================================================================================================ //
//     PUT
// ================================================================================================ //

// UPDATE PROFILE
router.put('/', (req, res) => {
  const profile = req.body;
  const userId = req.user.id;
  const queryText = `
    UPDATE 
      "user" 
    SET 
      first_name = $1, 
      last_name = $2, 
      city = $3, 
      state = $4, 
      profile_pic = $5 
    WHERE 
      id = $6;
  `;
  pool.query(queryText, [profile.first_name, profile.last_name, profile.city, profile.state, profile.profile_pic, userId])
  .then(response => {
    console.log('in PROFILE UPDATE .then', response.rows);
    res.sendStatus(200)
  }).catch(err => {
    console.log('in PROFILE UPDATE .catch', err);
    res.sendStatus(500)
  })
});

module.exports = router;
