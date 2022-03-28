const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// ===== INCOMING ===== //
router.get('/incoming', (req, res) => {
    const userId = req.user.id;
    const sqlText = `
        SELECT *, offer.id AS offer_id
        FROM offer JOIN listing 
        ON offer.listing_id = listing.id
        WHERE seller_user_id = $1
        ORDER BY status DESC, timestamp_created;
    `;
    pool.query(sqlText, [userId])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('Incoming Offers Error:', err);
            res.sendStatus(500);
        })
});

// ===== OUTGOING ===== //
router.get('/outgoing', (req, res) => {
    const userId = req.user.id;
    const sqlText = `
        SELECT *, offer.id AS offer_id
        FROM offer JOIN listing 
        ON offer.listing_id = listing.id
        WHERE buyer_user_id = $1
        ORDER BY status DESC, timestamp_created;
    `;
    pool.query(sqlText, [userId])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('Incoming Offers Error:', err);
            res.sendStatus(500);
        })
});

// ================================================================================================ //
//     POST
// ================================================================================================ //

// POST OFFER
router.post('/', (req, res) => {
    const offer = req.body;
    const queryText = `
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

// ================================================================================================ //
//     UPDATE
// ================================================================================================ //

// ACCEPT OFFER
router.put('/:id', async (req, res) => {
    const offerId = req.params.id;
    const connection = await pool.connect();

    try {
        await connection.query('BEGIN');
        // update offer status to 'status: accepted' in offer table
        const sqlUpdateOfferStatus = `UPDATE offer SET status = 'accepted' WHERE id = $1 RETURNING listing_id;`;
        const result = await connection.query(sqlUpdateOfferStatus, [offerId]);
        const listingId = result.rows[0].listing_id;
        // update listing to 'active: false' in listing table
        const sqlUpdateListingActive = `UPDATE listing SET active = 'FALSE' WHERE id = $1;`;
        await connection.query(sqlUpdateListingActive, [listingId]);
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('TRANSACTION ERROR', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});
// const sqlText = `UPDATE offer SET status = 'accepted' WHERE id = $1;`;
// pool.query(sqlText, [offerId])
// .then(result => {
//     console.log('in ACCEPT OFFER .put.then');
//     res.sendStatus(200)
// }).catch(err => {
//     console.log('in ACCEPT OFFER .put.catch', err);
//     res.sendStatus(500);
// })
// });

// ================================================================================================ //
//     DELETE
// ================================================================================================ //

// DECLINE OFFER (Delete offer)
router.delete('/:id', (req, res) => {
    const offerId = req.params.id;
    const sqlText = `DELETE FROM offer WHERE id = $1;`;
    pool.query(sqlText, [offerId])
        .then(result => {
            console.log('in DELETE offer .then');
            res.sendStatus(200)
        }).catch(err => {
            console.log('in DELETE offer .catch', err);
            res.sendStatus(500);
        })
});

module.exports = router;
