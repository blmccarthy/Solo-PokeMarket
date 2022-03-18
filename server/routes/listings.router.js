const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// GET ALL LISTINGS
router.get('/', (req, res) => {
  console.log('in GET listings router');
  const queryText = `SELECT * FROM listing ORDER BY id DESC;`
  pool.query(queryText).then(response => {
    console.log('in listings.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in listings.get.catch');
    res.sendStatus(500);
  })
});

// GET SELECTED LISTINGS
router.get('/selected/:id', (req, res) => {
  const id = req.params.id
  console.log('req.params', req.params);
  console.log('req.params.id', req.params.id);

  const queryText = `SELECT * FROM listing WHERE id = $1;`;
  pool.query(queryText, [id]).then(response => {
    console.log('in SELECTED.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in SELECTED.get.catch');
    res.sendStatus(500);
  })
});

// GET MY LISTINGS
router.get('/my-listings', (req, res) => {
  const userId = req.user.id
  const queryText = `SELECT * FROM listing WHERE user_id = $1 ORDER BY id DESC;`
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
  const queryText = `SELECT * FROM image;`
  pool.query(queryText).then(response => {
    console.log('in images.get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in listings.get.catch');
    res.sendStatus(500);
  })
});

// GET SELECTED IMAGES
router.get('/images/:id', (req, res) => {
  const listingId = req.params.id
  const queryText = `SELECT * FROM image WHERE listing_id = $1;`;
  pool.query(queryText, [listingId]).then(response => {
    console.log('in SELECTED IMAGE .get.then');
    res.send(response.rows);
  }).catch(err => {
    console.log('in SELECTED IMAGE.get.catch');
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
    RETURNING id;
  `;
  pool.query(queryText, [req.user.id, listing.card_name, listing.set, listing.condition, listing.graded, listing.grading_service, listing.asking_price, listing.notes, listing.offer_eligible, listing.trade_eligible])
    .then(response => {
      console.log('in POST listing .then');
      const createdListingId = response.rows[0].id; // ID of Listing that was just created

      const imagesQueryText = `
        INSERT INTO image (user_id, listing_id, url)
        VALUES ($1, $2, $3);`;

      console.log('req.user.id', req.user.id, 'createdListingId', createdListingId, 'listing.image_url', listing.image_url);

      pool.query(imagesQueryText, [req.user.id, createdListingId, listing.image_url])
        .then(res.sendStatus(201))
      // .catch(res.sendStatus(500))    // Commented out due to getting dupe response error?
      // Error: "Cannot set headers after they are sent to the client"
    }).catch(err => {
      console.log('in POST listing .catch', err);
      res.sendStatus(500);
    })
});


// ================================================================================================ //
//     UPDATE
// ================================================================================================ //

router.put('/:id', (req, res) => {
  console.log('in UPDATE listing');
  const listing = req.body;
  const queryText = `
    UPDATE listing 
    SET 
      card_name = $2, 
      set = $3, 
      condition = $4, 
      graded = $5, 
      grading_service = $6, 
      asking_price = $7, 
      notes = $8, 
      offer_eligible = $9, 
      trade_eligible = $10 
    WHERE 
      id = $1;
  `;
  pool.query(queryText, [listing.id, listing.card_name, listing.set, listing.condition, listing.graded, listing.grading_service, listing.asking_price, listing.notes, listing.offer_eligible, listing.trade_eligible])
    .then(response => {
      console.log('in POST listing .then');

      const imagesQueryText = `UPDATE image SET url = $1 WHERE listing_id = $2`

      pool.query(imagesQueryText, [listing.image_url, listing.id])
        .then(res.sendStatus(201))
      // .catch(res.sendStatus(500))    // Commented out due to getting dupe response error?
                                        // Error: "Cannot set headers after they are sent to the client"
    }).catch(err => {
      console.log('in POST listing .catch', err);
      res.sendStatus(500);
    })
});


// ================================================================================================ //
//     DELETE
// ================================================================================================ //

// router.delete('/:id', (req, res) => {
//   console.log('in DELETE listing');
//   const listingId = req.params.id;
//   const queryText = `
//     DELETE FROM listing WHERE id = $1;
//   `;
//   pool.query(queryText, [listingId])
//     .then(response => {
//       console.log('in DELETE listing .then');

//       imageDeleteQueryText = `
//         DELETE FROM image WHERE listing_id = $1;
//       `;
//       pool.query(imageDeleteQueryText, [listingId])
//         .then(res.sendStatus(200))
//         .catch(res.sendStatus(500))
//     }).catch(err => {
//       console.log('in DELETE listing .catch', err);
//       res.sendStatus(500);
//     })
// });

router.delete('/:id', (req, res) => {
  console.log('in DELETE listing');
  const listingId = req.params.id;
  const imageDeleteQueryText = `
    DELETE FROM image WHERE listing_id = $1;
  `;
  pool.query(imageDeleteQueryText, [listingId])
    .then(response => {
      console.log('in DELETE listing .then');
      queryText = `
        DELETE FROM listing WHERE id = $1;
      `;
      pool.query(queryText, [listingId])
        .then(res.sendStatus(200))
        // .catch(res.sendStatus(500))    // Commented out due to getting dupe response error?
                                          // Error: "Cannot set headers after they are sent to the client"
    }).catch(err => {
      console.log('in DELETE listing .catch', err);
      res.sendStatus(500);
    })
});

module.exports = router;
