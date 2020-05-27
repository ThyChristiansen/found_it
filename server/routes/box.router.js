const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//GET boxes route
router.get('/', rejectUnauthenticated, (req, res) => {
    queryString = `SELECT * FROM "boxes";`;
    pool.query(queryString)
        .then(result => {
            console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR in GET BOX', error)
            res.sendStatus(500);
        })
});

//GET details route
router.get('/:id', (req, res) => {
    console.log('----> id:',req.params.id);
    let queryText = `SELECT * FROM boxes WHERE id = $1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('get this row from database:',result.rows )
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // let qr_code = req.body.qr_code;
    const queryText = 'INSERT INTO "boxes" (box_name , qr_code) VALUES ((SELECT MAX(box_name)+1 FROM boxes), (SELECT MAX(qr_code)+1 FROM boxes)) RETURNING id';
    // const queryText = 'INSERT INTO "boxes" (box_name , qr_code) VALUES ((SELECT MAX(box_name)+1 FROM boxes), $1) RETURNING id';
    pool.query(queryText)
      .then(() => res.sendStatus(201)) // send status Created if send the POST request successfully
      .catch(() => res.sendStatus(500)); // / send status Error if do not send the POST request successfully
  
    // res.sendStatus(201);
});

router.delete('/:id', (req, res) => {
    let boxId = req.params.id;// We are using a request parameter (req.params) to identify
    // the specific picture. We expect this will be an id from the database.
    console.log('Delete request for this id: ', boxId);
    let sqlText = `DELETE FROM boxes WHERE id = $1`;
    pool.query(sqlText, [boxId])
        .then(result => {
            console.log('in DELETE router')
            res.sendStatus(200);
        }).catch(err => {
            console.log('Error in DELETE route', err);
            res.sendStatus(500);
        })
})

module.exports = router;