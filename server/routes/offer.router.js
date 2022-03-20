const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

router.get('/', (req, res) => {
    // POST route code here
});

// ================================================================================================ //
//     POST
// ================================================================================================ //

// POST OFFER
router.post('/', (req, res) => {
    console.log('in POST offer router');
    const offer = req.body;
    queryText = `
    INSERT INTO offer (
        listing_id, 
        buyer_user_id, 
        seller_user_id, 
        offer_amount, 
        trade_desc, 
        notes, 
        offer_type,
        status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
    pool.query(queryText, [offer.listing_id, offer.buyer_user_id, offer.seller_user_id, offer.offer_amount, offer.trade_desc, offer.notes, offer.offer_type, offer.status])
        .then(response => {
            console.log('in OFFER.post.then');
            res.sendStatus(200)
        }).catch(err => {
            console.log('in OFFER.post.catch', err);
            res.sendStatus(500);
        })
});

module.exports = router;
