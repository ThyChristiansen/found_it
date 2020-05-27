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

});

module.exports = router;