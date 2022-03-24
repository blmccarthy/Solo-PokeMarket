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
    res.send(response.rows);
  }).catch(err => {
    console.log('in SEARCH.get.catch', err);
    res.sendStatus(500);
  })
});

// ! NOT FUNCTIONAL CURRENTLY - JUST TESTING
// RETURN FILTERED SEARCH RESULTS 

router.get('/:card_name/:set', (req, res) => {

  const cardName = req.params.card_name;
  const set = req.params.set;

  const queryText = `
    SELECT * FROM listing 
    WHERE card_name ILIKE ('%' || $1 || '%')
    AND set ILIKE ('%' || $2 || '%');
  `;
  pool.query(queryText, [cardName, set]).then(response => {
    res.send(response.rows);
  }).catch(err => {
    console.log('in SEARCH.get.catch', err);
    res.sendStatus(500);
  })
});



// ! ///////////////////////////////////////

// ================================================================================================ //
//     POST
// ================================================================================================ //

router.post('/', (req, res) => {
  // POST route code here

  const userSearch = req.body;
  const queryText = `SELECT * FROM listing;`;

  pool.query(queryText).then(response => {
    let filteredArray = response.rows;

    console.log('Filter: None', filteredArray);

    // ----- Filter: Card Name ------------------------------------------------------------------------------
    if (userSearch.card_name) {
      filteredArray = filteredArray.filter(card => 
        card.card_name.toLowerCase() == userSearch.card_name.toLowerCase()
      );
      console.log('Filter: card_name', filteredArray);
    }
    // ----- Filter: Set -----------------------------------------------------------------------------------
    if (userSearch.set) {
      filteredArray = filteredArray.filter(card => 
        card.set.toLowerCase() == userSearch.set.toLowerCase()
      );
      console.log('Filter: set', filteredArray);
    }
    // ----- Filter: Condition ------------------------------------------------------------------------------
    if (!userSearch.search_NM) {
      filteredArray = filteredArray.filter(card => card.condition != 1);
      console.log('Filter: not NM');
    }
    if (!userSearch.search_LP) {
      filteredArray = filteredArray.filter(card => card.condition != 2);
      console.log('Filter: not LP');
    }
    if (!userSearch.search_MP) {
      filteredArray = filteredArray.filter(card => card.condition != 3);
      console.log('Filter: not MP');
    }
    if (!userSearch.search_HP) {
      filteredArray = filteredArray.filter(card => card.condition != 4);
      console.log('Filter: not HP');
    }
    if (!userSearch.search_DMG) {
      filteredArray = filteredArray.filter(card => card.condition != 5);
      console.log('Filter: not DMG');
    }
    // ----- Filter: Min Price ------------------------------------------------------------------------------
    if (userSearch.min_price) {
      filteredArray = filteredArray.filter(card => card.min_price > userSearch.min_price);
      console.log('Filter: min_price');
    }
    // ----- Filter: Max Price ------------------------------------------------------------------------------
    if (userSearch.max_price) {
      filteredArray = filteredArray.filter(card => card.max_price < userSearch.max_price);
      console.log('Filter: max_price');
    }
    // ----- Return Filtered Array -------------------------------------------------------------------------
    res.send(filteredArray);
  }).catch(err => {
    console.log('in SEARCH.get.catch', err);
    res.sendStatus(500);
  })
});

module.exports = router;
