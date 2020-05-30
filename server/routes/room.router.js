const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//GET boxes route
router.get('/', rejectUnauthenticated, (req, res) => {
    queryString = `SELECT * FROM "rooms";`;
    pool.query(queryString)
        .then(result => {
            console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR in GET_ROOM', error)
            res.sendStatus(500);
        })
});



module.exports = router;