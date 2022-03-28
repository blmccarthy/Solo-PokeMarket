const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ================================================================================================ //
//     GET
// ================================================================================================ //

// RETURN SEARCH RESULTS 
router.get('/:search', (req, res) => {
  const userId = req.user.id
  const searchFromUser = req.params.search;
  const queryText = `
    SELECT * FROM listing 
    WHERE user_id != $1 
    AND card_name 
    ILIKE ('%' || $2 || '%');
  `;
  pool.query(queryText, [userId, searchFromUser]).then(response => {
    res.send(response.rows);
  }).catch(err => {
    console.log('in SEARCH.get.catch', err);
    res.sendStatus(500);
  })
});


// ================================================================================================ //
//     POST: ADVANCED FILTER
// ================================================================================================ //

router.post('/', (req, res) => {

  const userId = req.user.id;
  const userSearch = req.body;
  const queryText = `
    SELECT * FROM listing 
    WHERE user_id != $1 
    ORDER BY id DESC;
    `;

  pool.query(queryText, [userId]).then(response => {
    let filteredArray = response.rows;

    console.log('Filter: None');

    // ----- Filter: Card Name ------------------------------------------------------------------------------
    if (userSearch.card_name) {
      filteredArray = filteredArray.filter(card => 
        // card.card_name.toLowerCase() == userSearch.card_name.toLowerCase()
        card.card_name.toLowerCase().includes(userSearch.card_name.toLowerCase())
      );
      console.log('Filter: card_name');
    }
    // ----- Filter: Set -----------------------------------------------------------------------------------
    if (userSearch.set) {
      filteredArray = filteredArray.filter(card => 
        card.set.toLowerCase().includes(userSearch.set.toLowerCase())
      );
      console.log('Filter: set');
    }
    // ----- Filter: Condition ------------------------------------------------------------------------------
    if (!userSearch.search_NM) {
      filteredArray = filteredArray.filter(card => card.condition != 1); // 1 = id for NM
      console.log('Filter: not NM');
    }
    if (!userSearch.search_LP) {
      filteredArray = filteredArray.filter(card => card.condition != 2); // 2 = id for LP
      console.log('Filter: not LP');
    }
    if (!userSearch.search_MP) {
      filteredArray = filteredArray.filter(card => card.condition != 3); // 3 = id for MP
      console.log('Filter: not MP');
    }
    if (!userSearch.search_HP) {
      filteredArray = filteredArray.filter(card => card.condition != 4); // 4 = id for HP
      console.log('Filter: not HP');
    }
    if (!userSearch.search_DMG) {
      filteredArray = filteredArray.filter(card => card.condition != 5); // 5 = id for DMG
      console.log('Filter: not DMG');
    }
    // ----- Filter: Min Price ------------------------------------------------------------------------------
    if (userSearch.min_price) {
      filteredArray = filteredArray.filter(card => Number(card.asking_price) > Number(userSearch.min_price));
      console.log('Filter: min_price');
    }
    // ----- Filter: Max Price ------------------------------------------------------------------------------
    if (userSearch.max_price) {
      filteredArray = filteredArray.filter(card => Number(card.asking_price) < Number(userSearch.max_price));
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

