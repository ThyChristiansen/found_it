const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.post('/:id', (req, res) => {
    let item = req.body.item;
    let boxId = req.params.id;
    console.log('----> send this item to database',item, boxId);
    const queryText = 'INSERT INTO "items" (items,box_id) VALUES ($1,$2) RETURNING id';
    pool.query(queryText,[item,boxId])
      .then(() => res.sendStatus(201)) // send status Created if send the POST request successfully
      .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully
  
    // res.sendStatus(201);
});





module.exports = router;