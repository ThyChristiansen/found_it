const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/:id', (req, res) => {
    let boxId = req.params.id
    // console.log(' boxId:',req.params.id);
    let queryText = `SELECT * FROM items WHERE box_id = $1`;
    pool.query(queryText, [boxId])
        .then((result) => {
            // console.log('get this row from table items:',result.rows )
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
        })
})

router.post('/:id', (req, res) => {
    let item = req.body.item;
    let boxId = req.params.id;
    console.log('send this item to database',item, boxId);
    const queryText = 'INSERT INTO "items" (item,box_id) VALUES ($1,$2) RETURNING id';
    pool.query(queryText,[item,boxId])
      .then(() => res.sendStatus(201)) // send status Created if send the POST request successfully
      .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully
  
    res.sendStatus(201);
});


router.delete('/:id', (req, res) => {
    let itemId = req.params.id;// We are using a request parameter (req.params) to identify
    // the specific picture. We expect this will be an id from the database.
    console.log('Delete request for this id: ', itemId);
    let sqlText = `DELETE FROM items WHERE id = $1`;
    pool.query(sqlText, [itemId])
        .then(result => {
            console.log('DELETE this item by id:', itemId)
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in DELETE route', err);
            res.sendStatus(500);
        })
})

module.exports = router;